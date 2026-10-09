// Cloudflare Turnstile site key (public), read at build time.
// Set TURNSTILE_SITE_KEY in Cloudflare Pages > Settings > Variables and Secrets.
// Falls back to Cloudflare's "always passes" test key for local development.
module.exports = {
  siteKey: process.env.TURNSTILE_SITE_KEY || "1x00000000000000000000AA",
};
