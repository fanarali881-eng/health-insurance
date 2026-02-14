// Cloudflare Worker - Full Reverse Proxy for Kuwait MOH Insurance Site
var TARGET_ORIGIN = 'https://insonline.moh.gov.kw';

// Content-Type map for file extensions
var MIME_TYPES = {
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.html': 'text/html',
  '.htm': 'text/html',
  '.pdf': 'application/pdf'
};

function getExtension(url) {
  try {
    var pathname = new URL(url).pathname;
    var dot = pathname.lastIndexOf('.');
    if (dot !== -1) {
      var ext = pathname.substring(dot).toLowerCase();
      var q = ext.indexOf('?');
      if (q !== -1) ext = ext.substring(0, q);
      return ext;
    }
  } catch(e) {}
  return '';
}

addEventListener('fetch', function(event) {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  var url = new URL(request.url);
  var workerOrigin = url.origin;

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '86400',
      }
    });
  }

  // Determine target URL
  var targetUrl;
  var urlParam = url.searchParams.get('url');
  
  if (urlParam) {
    targetUrl = urlParam;
  } else {
    var path = url.pathname;
    var search = url.search;
    if (path === '/' || path === '') {
      path = '/Insurance/logaction';
    }
    targetUrl = TARGET_ORIGIN + path + search;
  }

  // Security: only allow Kuwait MOH domain
  if (!targetUrl.startsWith(TARGET_ORIGIN)) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    var fetchHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': request.headers.get('Accept') || '*/*',
      'Accept-Language': 'ar,en-US;q=0.7,en;q=0.3',
      'Accept-Encoding': 'gzip, deflate, br',
      'Referer': TARGET_ORIGIN + '/Insurance/logaction',
    };

    // Forward cookies
    var cookie = request.headers.get('Cookie');
    if (cookie) fetchHeaders['Cookie'] = cookie;

    var fetchOptions = {
      method: request.method,
      headers: fetchHeaders,
      redirect: 'follow',
    };

    if (request.method === 'POST') {
      fetchOptions.body = await request.arrayBuffer();
      var ct = request.headers.get('Content-Type');
      if (ct) fetchHeaders['Content-Type'] = ct;
    }

    var response = await fetch(targetUrl, fetchOptions);
    var contentType = response.headers.get('Content-Type') || '';

    // Detect content type from extension if server didn't provide one or provided generic one
    var ext = getExtension(targetUrl);
    if (ext && MIME_TYPES[ext]) {
      if (!contentType || contentType === 'application/octet-stream' || contentType === '') {
        contentType = MIME_TYPES[ext];
      }
    }

    // Build clean response headers - remove X-Frame-Options and CSP
    var respHeaders = new Headers();
    respHeaders.set('Access-Control-Allow-Origin', '*');
    respHeaders.set('Access-Control-Expose-Headers', '*');
    
    // Copy all headers except security ones that block iframe
    var skipHeaders = ['x-frame-options', 'content-security-policy', 'content-security-policy-report-only', 'x-content-type-options'];
    for (var pair of response.headers.entries()) {
      if (skipHeaders.indexOf(pair[0].toLowerCase()) === -1) {
        respHeaders.set(pair[0], pair[1]);
      }
    }

    // Override Content-Type if we detected it from extension
    if (ext && MIME_TYPES[ext]) {
      respHeaders.set('Content-Type', MIME_TYPES[ext]);
    }

    // Add cache headers for static resources
    if (ext && ext !== '.html' && ext !== '.htm') {
      respHeaders.set('Cache-Control', 'public, max-age=86400');
    }

    // Forward Set-Cookie
    var setCookieHeaders = response.headers.getAll ? response.headers.getAll('Set-Cookie') : [];
    if (setCookieHeaders.length === 0) {
      var sc = response.headers.get('Set-Cookie');
      if (sc) respHeaders.set('Set-Cookie', sc);
    }

    // Handle HTML - rewrite all URLs
    if (contentType.includes('text/html')) {
      var html = await response.text();

      // Replace all absolute references to the original domain with worker domain
      html = html.split('https://insonline.moh.gov.kw').join(workerOrigin);
      html = html.split('http://insonline.moh.gov.kw').join(workerOrigin);
      html = html.split('//insonline.moh.gov.kw').join('//' + url.host);

      // Rewrite src="~/" and href="~/" (ASP.NET tilde notation)
      html = html.replace(/(src|href|action)\s*=\s*"~\//gi, '$1="' + workerOrigin + '/');

      // Inject a base tag to ensure relative URLs resolve correctly
      // The page is at /Insurance/logaction, relative paths like css/style.css
      // should resolve to /Insurance/css/style.css
      // We need to add <base href="/Insurance/"> if not already present
      if (html.indexOf('<base') === -1) {
        // Find the correct base path from the target URL
        var targetPath = new URL(targetUrl).pathname;
        var lastSlash = targetPath.lastIndexOf('/');
        var basePath = lastSlash > 0 ? targetPath.substring(0, lastSlash + 1) : '/Insurance/';
        var baseTag = '<base href="' + workerOrigin + basePath + '">';
        
        // Insert base tag after first <head> or at the beginning
        if (html.indexOf('<head>') !== -1) {
          html = html.replace('<head>', '<head>' + baseTag);
        } else if (html.indexOf('<head ') !== -1) {
          html = html.replace(/<head\s[^>]*>/, '$&' + baseTag);
        } else {
          // Inject at the very beginning if no head tag
          html = baseTag + html;
        }
      }

      // Inject script to intercept all navigation and form submissions
      var navScript = '<script>' +
        // Notify parent of current page path for refresh persistence
        'try{if(window.parent!==window){' +
          'window.parent.postMessage({type:"moh-navigation",path:window.location.pathname+window.location.search},"*");' +
        '}}catch(e){}' +
        'document.addEventListener("click",function(e){' +
          'var a=e.target.closest("a[href]");' +
          'if(!a)return;' +
          'var h=a.getAttribute("href");' +
          'if(!h||h.startsWith("javascript:")||h.startsWith("#")||h.startsWith("mailto:"))return;' +
          'if(h.indexOf("insonline.moh.gov.kw")!==-1){' +
            'e.preventDefault();' +
            'window.location.href=h.replace(/https?:\\/\\/insonline\\.moh\\.gov\\.kw/g,"' + workerOrigin + '");' +
          '}' +
        '},true);' +
        'document.addEventListener("submit",function(e){' +
          'var f=e.target;if(!f)return;' +
          'var a=f.getAttribute("action")||"";' +
          'if(a.indexOf("insonline.moh.gov.kw")!==-1){' +
            'f.setAttribute("action",a.replace(/https?:\\/\\/insonline\\.moh\\.gov\\.kw/g,"' + workerOrigin + '"));' +
          '}' +
        '},true);' +
      '</script>';
      
      if (html.indexOf('</body>') !== -1) {
        html = html.replace('</body>', navScript + '</body>');
      } else {
        html = html + navScript;
      }

      respHeaders.set('Content-Type', 'text/html; charset=utf-8');
      return new Response(html, { status: response.status, headers: respHeaders });
    }
    
    // Handle CSS - rewrite url() references pointing to original domain
    if (contentType.includes('text/css') || ext === '.css') {
      var css = await response.text();
      css = css.split('https://insonline.moh.gov.kw').join(workerOrigin);
      css = css.split('http://insonline.moh.gov.kw').join(workerOrigin);
      respHeaders.set('Content-Type', 'text/css; charset=utf-8');
      return new Response(css, { status: response.status, headers: respHeaders });
    }

    // Handle JavaScript - rewrite any hardcoded domain references
    if (contentType.includes('javascript') || ext === '.js') {
      var js = await response.text();
      js = js.split('https://insonline.moh.gov.kw').join(workerOrigin);
      js = js.split('http://insonline.moh.gov.kw').join(workerOrigin);
      respHeaders.set('Content-Type', 'application/javascript; charset=utf-8');
      return new Response(js, { status: response.status, headers: respHeaders });
    }

    // All other resources (images, fonts, etc) - pass through as-is
    var body = await response.arrayBuffer();
    return new Response(body, { status: response.status, headers: respHeaders });

  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to fetch',
      message: error.message,
      url: targetUrl
    }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}
