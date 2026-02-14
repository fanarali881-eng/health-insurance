// Vercel Serverless Function - Reverse Proxy for Kuwait MOH Insurance Site
// This function fetches pages from the Kuwait MOH site, strips security headers,
// and returns the content so it can be displayed in an iframe.

export default async function handler(req, res) {
  const targetUrl = req.query.url || 'https://insonline.moh.gov.kw/Insurance/logaction';
  
  // Only allow proxying to the Kuwait MOH domain
  if (!targetUrl.startsWith('https://insonline.moh.gov.kw/')) {
    return res.status(403).json({ error: 'Only Kuwait MOH Insurance site is allowed' });
  }

  try {
    // Forward the request to the target URL
    const fetchOptions = {
      method: req.method || 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'ar,en-US;q=0.7,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      redirect: 'follow',
    };

    // Forward POST body if present
    if (req.method === 'POST' && req.body) {
      fetchOptions.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      fetchOptions.headers['Content-Type'] = req.headers['content-type'] || 'application/x-www-form-urlencoded';
    }

    const response = await fetch(targetUrl, fetchOptions);
    const contentType = response.headers.get('content-type') || 'text/html';
    
    // Set CORS and framing headers to allow embedding
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Content-Type', contentType);
    
    // Remove X-Frame-Options and CSP headers
    // (we explicitly do NOT set them)
    
    if (contentType.includes('text/html')) {
      let html = await response.text();
      
      // Add base tag to fix relative URLs
      const baseUrl = new URL(targetUrl);
      const baseHref = `${baseUrl.protocol}//${baseUrl.host}`;
      
      html = html.replace(/<head([^>]*)>/i, `<head$1>\n<base href="${baseHref}/">`);
      
      // Rewrite relative URLs to go through our proxy
      // This ensures navigation within the iframe stays proxied
      html = html.replace(
        /(<form[^>]*action=["'])(?!http)([^"']*)(["'])/gi,
        `$1/api/proxy?url=${encodeURIComponent(baseHref)}/$2$3`
      );
      
      // Add script to intercept link clicks and form submissions
      html = html.replace('</body>', `
        <script>
          // Intercept all link clicks to route through proxy
          document.addEventListener('click', function(e) {
            var link = e.target.closest('a[href]');
            if (link && link.href) {
              var href = link.getAttribute('href');
              if (href && !href.startsWith('javascript:') && !href.startsWith('#')) {
                e.preventDefault();
                var fullUrl;
                if (href.startsWith('http')) {
                  fullUrl = href;
                } else if (href.startsWith('/')) {
                  fullUrl = '${baseHref}' + href;
                } else {
                  fullUrl = '${targetUrl.substring(0, targetUrl.lastIndexOf("/"))}/' + href;
                }
                if (fullUrl.includes('insonline.moh.gov.kw')) {
                  window.location.href = '/api/proxy?url=' + encodeURIComponent(fullUrl);
                } else {
                  window.location.href = fullUrl;
                }
              }
            }
          }, true);
          
          // Intercept form submissions
          document.addEventListener('submit', function(e) {
            var form = e.target;
            if (form && form.action) {
              e.preventDefault();
              var action = form.getAttribute('action') || window.location.href;
              var fullUrl;
              if (action.startsWith('http')) {
                fullUrl = action;
              } else if (action.startsWith('/')) {
                fullUrl = '${baseHref}' + action;
              } else {
                fullUrl = '${targetUrl.substring(0, targetUrl.lastIndexOf("/"))}/' + action;
              }
              
              if (form.method.toLowerCase() === 'post') {
                var formData = new FormData(form);
                fetch('/api/proxy?url=' + encodeURIComponent(fullUrl), {
                  method: 'POST',
                  body: new URLSearchParams(formData)
                }).then(function(r) { return r.text(); })
                  .then(function(html) { document.open(); document.write(html); document.close(); });
              } else {
                var params = new URLSearchParams(new FormData(form)).toString();
                window.location.href = '/api/proxy?url=' + encodeURIComponent(fullUrl + '?' + params);
              }
            }
          }, true);
        </script>
      </body>`);
      
      return res.status(response.status).send(html);
    } else {
      // For non-HTML content (CSS, JS, images), pipe through directly
      const buffer = await response.arrayBuffer();
      return res.status(response.status).send(Buffer.from(buffer));
    }
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(502).json({ 
      error: 'Failed to fetch the target page',
      message: error.message,
      hint: 'The Kuwait MOH site may only be accessible from Kuwait IP addresses'
    });
  }
}
