/**
 * Cloudflare Worker — GitHub OAuth Proxy for Decap CMS
 * 
 * Deploy Command:
 *   npx wrangler deploy scripts/cms-oauth-worker.js --name learnsapfree-cms-oauth
 * 
 * After deploy, set secrets:
 *   npx wrangler secret put GITHUB_CLIENT_ID
 *   npx wrangler secret put GITHUB_CLIENT_SECRET
 */

const ALLOWED_DOMAINS = [
  'learnsapfree.com',
  'localhost:4321',
  'localhost:3000'
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // ── /auth ── Redirect to GitHub OAuth
    if (url.pathname === '/auth') {
      const params = new URLSearchParams({
        client_id: env.GITHUB_CLIENT_ID,
        redirect_uri: `${url.origin}/callback`,
        scope: 'repo,user',
        state: crypto.randomUUID(),
      });
      return Response.redirect(
        `https://github.com/login/oauth/authorize?${params}`,
        302
      );
    }

    // ── /callback ── Exchange code → token, send back to CMS
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');

      if (!code) {
        return new Response('Missing OAuth code', { status: 400 });
      }

      // Exchange code for access token
      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });

      const tokenData = await tokenRes.json();

      if (tokenData.error) {
        return new Response(`OAuth Error: ${tokenData.error_description}`, { status: 400 });
      }

      // Send token back to the CMS via postMessage
      const html = `<!DOCTYPE html>
<html>
<head><title>Authenticating...</title></head>
<body>
<script>
  const token = ${JSON.stringify(tokenData.access_token)};
  const provider = 'github';
  window.opener.postMessage(
    'authorization:' + provider + ':success:' + JSON.stringify({ token, provider }),
    '*'
  );
  window.close();
</script>
<p>Authentication successful! You can close this window.</p>
</body>
</html>`;

      return new Response(html, {
        headers: { 'Content-Type': 'text/html', ...corsHeaders },
      });
    }

    return new Response('Decap CMS OAuth Proxy — Learn SAP Free', {
      headers: { 'Content-Type': 'text/plain' },
    });
  },
};
