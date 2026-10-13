// Cloudflare Pages Function: POST /api/waitlist
// Adds the submitted email to Resend Contacts and emails the team about the signup.
//
// Environment variables (Cloudflare Pages > Settings > Variables and Secrets):
//   RESEND_API_KEY        (secret, required)  Resend API key with full access
//   TURNSTILE_SECRET_KEY  (secret, required)  Turnstile widget secret key
//   RESEND_SEGMENT_ID     (optional)          Resend segment to add waitlist contacts to

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GENERIC_ERROR = "Something went wrong. Please try again later.";

// Signup notifications (sender must be on the domain verified in Resend)
const NOTIFY_FROM = "website@forms.theampdeck.com";
const NOTIFY_TO = "theampdeck@ampvisualmedia.com";

export async function onRequestPost({ request, env, waitUntil }) {
  const wantsJson = (request.headers.get("Accept") || "").includes("application/json");

  // Works for both the fetch() call (JSON) and a plain form post without JS
  let email = "";
  let honeypot = "";
  let token = "";
  const contentType = request.headers.get("Content-Type") || "";
  try {
    if (contentType.includes("application/json")) {
      const body = await request.json();
      email = body.email;
      honeypot = body.company;
      token = body.token;
    } else {
      const form = await request.formData();
      email = form.get("email");
      honeypot = form.get("company");
      token = form.get("cf-turnstile-response");
    }
  } catch (err) {
    return respond(wantsJson, 400, "Invalid request.");
  }

  email = String(email || "").trim().toLowerCase();

  // Bots fill the hidden "company" field; pretend it worked
  if (honeypot) return respond(wantsJson, 200, "You're on the list.");

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return respond(wantsJson, 400, "Please enter a valid email address.");
  }

  if (!env.RESEND_API_KEY || !env.TURNSTILE_SECRET_KEY) {
    console.error("RESEND_API_KEY or TURNSTILE_SECRET_KEY is not set");
    return respond(wantsJson, 500, GENERIC_ERROR);
  }

  const verified = await verifyTurnstile(token, env.TURNSTILE_SECRET_KEY, request.headers.get("CF-Connecting-IP"));
  if (!verified) {
    return respond(wantsJson, 403, "Verification failed. Please try again.");
  }

  const contact = { email, unsubscribed: false };
  if (env.RESEND_SEGMENT_ID) contact.segments = [{ id: env.RESEND_SEGMENT_ID }];

  const res = await fetch("https://api.resend.com/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });

  if (!res.ok) {
    const detail = await res.text();
    // Someone signing up twice is not an error for them
    if (/already exists/i.test(detail)) return respond(wantsJson, 200, "You're already on the list.");
    console.error("Resend error", res.status, detail);
    return respond(wantsJson, 502, GENERIC_ERROR);
  }

  // Notify the team in the background; a failed notification shouldn't fail the signup
  waitUntil(notifyTeam(email, env.RESEND_API_KEY));

  return respond(wantsJson, 200, "You're on the list.");
}

async function notifyTeam(email, apiKey) {
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
        subject: `New waitlist signup: ${email}`,
        text: `${email} just joined the waitlist.\n\nReply to this email to contact them directly.`,
      }),
    });
    if (!res.ok) console.error("Resend notification error", res.status, await res.text());
  } catch (err) {
    console.error("Resend notification error", err);
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
  const result = status < 400 ? "joined" : "error";
  return new Response(null, { status: 303, headers: { Location: `/?waitlist=${result}#waitlist` } });
}
