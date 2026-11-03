// Cloudflare Pages Function: POST /api/contact
// Emails the team about each contact form submission (nothing is stored).
//
// Environment variables (Cloudflare Pages > Settings > Variables and Secrets):
//   RESEND_API_KEY        (secret, required)  Resend API key with sending access
//   TURNSTILE_SECRET_KEY  (secret, required)  Turnstile widget secret key

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUCCESS = "Thanks, we'll be in touch.";
const MAX_TEXT_LENGTH = 200;
const GENERIC_ERROR = "Something went wrong. Please try again later.";

// Contact notifications (sender must be on the domain verified in Resend)
const NOTIFY_FROM = "website@forms.theampdeck.com";
const NOTIFY_TO = "theampdeck@ampvisualmedia.com";

export async function onRequestPost({ request, env }) {
  const wantsJson = (request.headers.get("Accept") || "").includes("application/json");

  // Works for both the fetch() call (JSON) and a plain form post without JS
  let name = "";
  let email = "";
  let business = "";
  let honeypot = "";
  let token = "";
  const contentType = request.headers.get("Content-Type") || "";
  try {
    if (contentType.includes("application/json")) {
      const body = await request.json();
      name = body.name;
      email = body.email;
      business = body.business;
      honeypot = body.website;
      token = body.token;
    } else {
      const form = await request.formData();
      name = form.get("name");
      email = form.get("email");
      business = form.get("business");
      honeypot = form.get("website");
      token = form.get("cf-turnstile-response");
    }
  } catch (err) {
    return respond(wantsJson, 400, "Invalid request.");
  }

  name = cleanText(name);
  email = String(email || "").trim().toLowerCase();
  business = cleanText(business);

  // Bots fill the hidden "website" field; pretend it worked
  if (honeypot) return respond(wantsJson, 200, SUCCESS);

  if (!name || name.length > MAX_TEXT_LENGTH) {
    return respond(wantsJson, 400, "Please enter your name.");
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return respond(wantsJson, 400, "Please enter a valid email address.");
  }

  if (!business || business.length > MAX_TEXT_LENGTH) {
    return respond(wantsJson, 400, "Please enter your business name.");
  }

  if (!env.RESEND_API_KEY || !env.TURNSTILE_SECRET_KEY) {
    console.error("RESEND_API_KEY or TURNSTILE_SECRET_KEY is not set");
    return respond(wantsJson, 500, GENERIC_ERROR);
  }

  const verified = await verifyTurnstile(token, env.TURNSTILE_SECRET_KEY, request.headers.get("CF-Connecting-IP"));
  if (!verified) {
    return respond(wantsJson, 403, "Verification failed. Please try again.");
  }

  const sent = await notifyTeam({ name, email, business }, env.RESEND_API_KEY);
  if (!sent) return respond(wantsJson, 502, GENERIC_ERROR);

  return respond(wantsJson, 200, SUCCESS);
}

// Single line, no stray spacing
function cleanText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

async function notifyTeam({ name, email, business }, apiKey) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `The Amp Deck Website <${NOTIFY_FROM}>`,
        to: [NOTIFY_TO],
        reply_to: email,
        subject: `New contact form submission from ${name}`,
        text: `You have a new contact form submission.\n\nName: ${name}\nEmail: ${email}\nBusiness: ${business}\n\nReply to this email to contact them directly.`,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend error", err);
    return false;
  }
}

async function verifyTurnstile(token, secret, ip) {
  if (!token || typeof token !== "string" || token.length > 2048) return false;

  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
    const outcome = await res.json();
    if (!outcome.success) console.error("Turnstile rejected", outcome["error-codes"]);
    return outcome.success === true;
  } catch (err) {
    console.error("Turnstile verification error", err);
    return false;
  }
}

function respond(wantsJson, status, message) {
  if (wantsJson) {
    return Response.json({ ok: status < 400, message }, { status });
  }
  // No-JS form post: send them back to the page
  const result = status < 400 ? "sent" : "error";
  return new Response(null, { status: 303, headers: { Location: `/?contact=${result}#contact` } });
}
