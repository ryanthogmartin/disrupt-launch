# Overnight Handoff — DISRUPT Launch

Summary of work done unattended on 2026-04-19 night. None of this is deployed yet for the pieces that carry risk — this doc is the go/no-go for each.

## ✅ Already deployed (pushed to `main`, Netlify live)

### 1. Mobile responsive fixes
- **`app/launch.html`** — email / tel / url / number inputs now span full width on mobile (previously only `type="text"` had the `width:100%` rule, so the account screen's Email and Mobile fields were stubby).
- **`app/dashboard.html`** — added a `@media(max-width:440px)` block that tightens topbar paddings, tab spacing, and icon-button sizes so all 3 action buttons (settings / theme / logout) fit on iPhone SE (375px) without clipping.

### 2. "Send me the demo" lead-capture form
- Lives at the bottom of the closing CTA in `app/index.html` — yellow form, email field + "Send Demo →" button.
- On submit, POSTs to `https://disrupt-proxy.disruptmedia.workers.dev/share-demo`.
- Auto-detects `localhost` and points at `http://localhost:8787` during local dev so you don't spam yourself while testing.
- **This form will 4xx until you deploy the hardened Worker (section 3) — the `/share-demo` endpoint lives only in the updated Worker.**

## ⏳ Ready to deploy, needs your sign-off

### 3. Worker hardening + new `/share-demo` endpoint
File: `~/Desktop/disrupt-worker/worker.js`

**Changes:**
- **Origin allowlist** — requests from unlisted origins get 403. Whitelist is hardcoded:
  - `https://launch.disruptmedia.co`
  - `https://disrupt-launch.netlify.app` (for Netlify deploy previews)
  - `http://localhost:4100`, `http://localhost:3000`, `http://127.0.0.1:4100`, `http://127.0.0.1:3000` (dev)
- **Per-IP rate limiter** — in-memory, per-Worker-isolate (so not strictly distributed, but deters casual abuse without needing KV/DO setup):
  - `/ai`: 30 req/min per IP
  - `/deliver`: 30 req/min per IP
  - `/share-demo`: 5 req/min per IP (anti-spam)
- **New `/share-demo` endpoint** — takes `{ email, name?, businessName? }`, sends the prospect a styled email with the tour link (`?tour=true`), optionally notifies you at `NOTIFY_EMAIL`, and logs to the Sheets webhook if configured.

**Tested locally against the dev worker (port 8787):**
- OPTIONS preflight from allowed origin → 204 ✅
- OPTIONS preflight from disallowed origin → 403 ✅
- POST without Origin header → 403 ✅
- POST with allowed Origin but no token → 401 ✅
- `/share-demo` reachable with correct token ✅

**Deploy command (run when you're ready):**
```bash
cd ~/Desktop/disrupt-worker
npx wrangler deploy
```

**Before you deploy, double-check the allowlist** — if you serve from a URL I didn't anticipate (deploy preview subdomain, staging, etc.), add it to `ALLOWED_ORIGINS` at the top of `worker.js` first.

**After you deploy**, verify with:
```bash
# Should 403
curl -i -X POST https://disrupt-proxy.disruptmedia.workers.dev/share-demo \
  -H "Content-Type: application/json" -H "Origin: https://evil.com" \
  -H "X-Disrupt-Token: disrupt-2026-key" \
  --data '{"email":"a@b.co"}'

# Should succeed (200)
curl -i -X POST https://disrupt-proxy.disruptmedia.workers.dev/share-demo \
  -H "Content-Type: application/json" -H "Origin: https://launch.disruptmedia.co" \
  -H "X-Disrupt-Token: disrupt-2026-key" \
  --data '{"email":"your-test@gmail.com","name":"Test"}'
```

Then load `https://launch.disruptmedia.co/` and submit the "Send me the demo" form at the bottom — check your inbox (and your `NOTIFY_EMAIL` for the lead alert).

## 🔎 Investigation finding: admin login is already safe-ish

Your original note said `ryan@disruptmedia.co / 9999` is "in dashboard.html source". I read the login code (`handleLogin()` in `app/dashboard.html:497`). **It isn't** — the credentials live in the Supabase `clients` table (`role='admin'`). The only thing in source is cosmetic text on the admin hero (`Ryan Thogmartin · ryan@disruptmedia.co`), which is fine to be public.

**Still worth doing post-conference** (not tonight — too risky unattended):
- 4-digit PIN stored plaintext in Supabase is weak. Hash it server-side, or migrate to Supabase Auth's email magic-link.
- No rate limit on login attempts. A `/login` Worker endpoint that rate-limits per-IP would fix this without requiring a full Auth migration.

## ❌ Couldn't do alone

- **End-to-end Stripe purchase test** — can't pay real money. Do this yourself: buy Self-Guided on the live URL, follow through to intake → generation → dashboard, confirm email arrives.
- **Email deliverability check** — I can't open Gmail/Outlook/GoDaddy to verify the strategy email doesn't land in spam. Send yourself a test after the Worker deploys; if spam, verify a sending domain on Resend (currently using `onboarding@resend.dev` which is known to land in promotions/spam).

## Commits pushed tonight

```
<commit_hash>  Mobile responsive fixes (inputs + topbar) + 'Send me the demo' form
```

## If any of this breaks

- **Form shows "Something went wrong"** — Worker isn't deployed yet, or `DISRUPT_TOKEN` env var isn't set in production. Check with `npx wrangler tail` after deploy.
- **Dashboard topbar looks weird on your phone** — revert `app/dashboard.html` `@media(max-width:440px)` block (it's additive, safe to remove).
- **Tour broken** — unrelated to tonight's changes; it's the same code as yesterday.

— Claude, ~2am
