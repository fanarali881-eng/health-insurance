import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";
import http from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Proxy function to fetch pages from Kuwait MOH site
function proxyFetch(targetUrl: string): Promise<{ status: number; headers: Record<string, string>; body: Buffer }> {
  return new Promise((resolve, reject) => {
    const url = new URL(targetUrl);
    const client = url.protocol === 'https:' ? https : http;
    
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname + url.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'ar,en-US;q=0.7,en;q=0.3',
        'Accept-Encoding': 'identity',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      timeout: 15000,
      rejectUnauthorized: false, // Allow self-signed certs
    };

    const req = client.request(options, (res) => {
      const chunks: Buffer[] = [];
      res.on('data', (chunk: Buffer) => chunks.push(chunk));
      res.on('end', () => {
        const body = Buffer.concat(chunks);
        const headers: Record<string, string> = {};
        for (const [key, value] of Object.entries(res.headers)) {
          if (value) headers[key] = Array.isArray(value) ? value.join(', ') : value;
        }
        resolve({ status: res.statusCode || 200, headers, body });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    req.end();
  });
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Parse request bodies
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // ===== PROXY ROUTE FOR KUWAIT MOH INSURANCE SITE =====
  app.all("/api/proxy", async (req, res) => {
    const targetUrl = (req.query.url as string) || 'https://insonline.moh.gov.kw/Insurance/logaction';
    
    // Only allow proxying to the Kuwait MOH domain
    if (!targetUrl.startsWith('https://insonline.moh.gov.kw/') && !targetUrl.startsWith('http://insonline.moh.gov.kw/')) {
      return res.status(403).json({ error: 'Only Kuwait MOH Insurance site is allowed' });
    }

    try {
      const result = await proxyFetch(targetUrl);
      const contentType = result.headers['content-type'] || 'text/html';
      
      // Set CORS headers and remove framing restrictions
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', '*');
      res.setHeader('Content-Type', contentType);
      // Explicitly do NOT set X-Frame-Options or CSP
      
      if (contentType.includes('text/html')) {
        let html = result.body.toString('utf-8');
        
        // Add base tag for relative URLs
        const baseUrl = new URL(targetUrl);
        const baseHref = `${baseUrl.protocol}//${baseUrl.host}`;
        
        html = html.replace(/<head([^>]*)>/i, `<head$1>\n<base href="${baseHref}/">`);
        
        // Add navigation interception script
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
                
                if (form.method && form.method.toLowerCase() === 'post') {
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
        
        return res.status(result.status).send(html);
      } else {
        // For non-HTML content (CSS, JS, images), pipe through directly
        return res.status(result.status).send(result.body);
      }
    } catch (error: any) {
      console.error('Proxy error:', error.message);
      return res.status(502).json({ 
        error: 'Failed to fetch the target page',
        message: error.message,
        hint: 'The Kuwait MOH site may only be accessible from Kuwait IP addresses. The proxy will work when deployed on a server with Kuwait access.'
      });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
