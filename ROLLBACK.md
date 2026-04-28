# DISRUPT Launch — Incident & Rollback Playbook

When something breaks in production, work the playbook top to bottom. Most outages are fixed in under 5 minutes via a Worker rollback or a Netlify revert.

---

## Quick links

| Service | URL | Used for |
|---|---|---|
| Frontend | https://launch.disruptmedia.co | Buyer-facing site |
| Worker | https://disrupt-proxy.disruptmedia.workers.dev | API + email + AI proxy |
| Health probe | https://disrupt-proxy.disruptmedia.workers.dev/health | First check, always |
| Netlify | https://app.netlify.com | Frontend deploys + rollback |
| Cloudflare | https://dash.cloudflare.com → Workers → disrupt-proxy | Worker deploys + secrets |
| Supabase | https://supabase.com/dashboard/project/hreahmwfzmuhgkkhrbdq | DB + SQL Editor + PITR |
| Stripe | https://dashboard.stripe.com | Payments + webhooks + refunds |
| Resend | https://resend.com/emails | Email delivery logs |

---

## Triage in 60 seconds

Run these in order. The **first one that fails** tells you what's wrong.

```bash
# 1. Health probe (Worker)
curl https://disrupt-proxy.disruptmedia.workers.dev/health
# Expect: {"ok":true,"env":{"supabase":true,"resend":true,"anthropic":true,"stripe":true,"session":true}}
# Any false → that secret is missing in Cloudflare. Any 5xx → Worker is down.

# 2. Frontend reachable
curl -I https://launch.disruptmedia.co/launch.html
# Expect: HTTP/2 200. Any 5xx → Netlify deploy failed.

# 3. Worker live tail (run in a second terminal during the incident)
cd ~/Desktop/disrupt-worker && npx wrangler tail --format pretty

# 4. Provider status pages
# https://status.anthropic.com  https://status.stripe.com
# https://www.cloudflarestatus.com  https://status.resend.com
```

If `/health` is green and provider status is green, the issue is almost always in the most recent deploy. Roll it back.

---

## Scenario A — Worker is broken (generation, signup, dashboard data fail)

**Symptom**: buyers see "Something went wrong" on generation, or the dashboard returns errors, or `/health` is non-200, or an admin endpoint stops responding.

**Roll back to a prior version** — fastest fix in production. ~30 seconds total:

```bash
cd ~/Desktop/disrupt-worker

# List recent versions (newest first)
npx wrangler deployments list

# Pick a known-good version ID from the list, then:
npx wrangler rollback <version-id>

# Confirm
curl https://disrupt-proxy.disruptmedia.workers.dev/health
```

**Re-deploying after a fix** (if you've patched the bug):

```bash
cd ~/Desktop/disrupt-worker
npx wrangler deploy
# Note the "Current Version ID:" in the output — save it as the new known-good
```

**Last-resort total wipe** (if rollback doesn't help): re-deploy from a known-good git SHA.

```bash
cd ~/Desktop/disrupt-worker
git log --oneline -10
git checkout <good-sha> -- worker.js
npx wrangler deploy
git checkout HEAD -- worker.js  # bring local back to current HEAD
```

---

## Scenario B — Frontend (dashboard / launch.html) is broken

**Symptom**: white screen, missing UI element, JavaScript console errors, redirect loop, broken intake.

### Option 1 — Revert the bad commit on git

```bash
cd ~/Claude\ Code/disrupt-launch
git log --oneline -10
# Identify the latest bad commit. Then either:
git revert HEAD                 # if HEAD is the broken one (creates a revert commit)
# OR
git reset --hard <good-sha>     # nukes the bad commits — destructive, use with care
git push                        # Netlify auto-deploys in ~30s
```

### Option 2 — Roll back via Netlify dashboard (no terminal)

1. Open https://app.netlify.com → disrupt-launch site
2. Deploys tab → find a previous deploy with a green badge
3. Click ⋯ → **Publish deploy**
4. Live in seconds. No git changes needed.

This is often the fastest fix when Ryan can't shell into a laptop.

---

## Scenario C — Stripe payment succeeded but no email arrived

**Symptom**: buyer reports they paid but never got a setup email.

**Diagnostic checklist:**

1. Check the Worker tail during a known-good moment: `npx wrangler tail --format pretty`. Look for `Stripe webhook` entries. Common errors:
   - `Stripe webhook signature rejected` → secret mismatch (see fix below)
   - `Stripe webhook: no email on session` → Stripe didn't pass an email
   - `Stripe welcome email failed` → Resend rejected (key issue or rate limit)

2. Check Resend dashboard → Logs → look for the buyer's email address. If marked failed/bounced, the issue is on Resend's side.

3. Check Stripe dashboard → Developers → Webhooks → click the most recent event → look for delivery errors.

**Fixes:**

- **Signature mismatch**: Stripe rotated or admin regenerated the webhook secret.
  ```bash
  cd ~/Desktop/disrupt-worker
  npx wrangler secret put STRIPE_WEBHOOK_SECRET
  # paste the new whsec_... value from Stripe dashboard → Webhooks → endpoint → Reveal
  ```
- **Resend API key revoked or rate-limited**: get a fresh key from resend.com → Settings → API Keys.
  ```bash
  npx wrangler secret put RESEND_API_KEY
  ```

**Recovery for the buyer once fixed:**
- Tell them to use the **"Paid but didn't get your setup email?"** link on https://launch.disruptmedia.co — they enter their email and get a fresh 30-day setup token.

---

## Scenario D — Buyer needs manual recovery

| Issue | Fix |
|---|---|
| Forgot password | Tell them to click "Forgot password?" on the login page |
| Lost setup email | Tell them to click "Paid but didn't get your setup email?" on the login page |
| Want to redo their strategy | Admin dashboard → their client row → click **Regenerate** → they log back in and walk through intake again |
| Want a refund | Process refund in Stripe dashboard, then admin dashboard → their row → **Delete** (3-gate fail-safe: typed business name + admin password + confirm) |
| Stuck mid-generation (failure screen) | They've already received an admin alert + a recovery email automatically. Reach out within an hour. If still stuck, click **Regenerate** on their row so they can re-run. |

---

## Scenario E — Catastrophic data corruption

If a SQL update went wrong and affected many clients (rare — would have to be manual SQL or a misfire of `/admin/regenerate-strategy` on multiple rows):

1. **Supabase Point-in-Time Recovery**:
   - https://supabase.com/dashboard/project/hreahmwfzmuhgkkhrbdq → Project Settings → Database → Backups
   - Restores up to N days back (depends on your plan; typically 7).
   - **Restoring is irreversible.** Contact Supabase support before proceeding.

2. **Selective revert** (one or two clients):
   - SQL Editor → patch via `UPDATE clients SET intake_answers = ... WHERE id = ...`
   - The `_strategy_regenerated_at` / `_strategy_unreleased_at` keys can help you identify recent changes.

---

## Common diagnostic commands

```bash
# Live worker traffic
cd ~/Desktop/disrupt-worker && npx wrangler tail --format pretty

# Health probe
curl https://disrupt-proxy.disruptmedia.workers.dev/health

# List Worker deploys (newest first)
cd ~/Desktop/disrupt-worker && npx wrangler deployments list

# List Worker secrets (names only, no values)
cd ~/Desktop/disrupt-worker && npx wrangler secret list

# Recent frontend commits
cd ~/Claude\ Code/disrupt-launch && git log --oneline -10

# Verify public signup is locked down
curl -X POST https://disrupt-proxy.disruptmedia.workers.dev/auth/signup \
  -H "Content-Type: application/json" \
  -H "Origin: https://launch.disruptmedia.co" \
  -d '{"email":"x@x.com","password":"abc12345"}'
# Expect: {"error":"Public signup is disabled..."}

# Verify Stripe webhook signature is configured
curl -X POST https://disrupt-proxy.disruptmedia.workers.dev/stripe/webhook \
  -H "Content-Type: application/json" -d '{}'
# Expect: invalid signature  (means the endpoint is alive and rejecting unsigned)
```

---

## What to tell a buyer mid-incident

Use this template when a buyer reports a problem during a verified outage:

> Hi [name] — we're aware of the issue and are working on a fix right now. Your purchase is safe — your account exists and your intake answers are saved. We'll email you within [estimate] when everything's back online. Thanks for your patience.

Then **actually** email them when it's fixed. Keep it short:

> [name] — we're back up. You can pick up where you left off at https://launch.disruptmedia.co — log in with your email and password. The earlier error didn't lose any of your work.

---

## Pre-incident readiness checklist

Run through this once. If anything is unchecked, fix it before the next conference.

- [x] UptimeRobot pinging `/health` every 5 min with keyword check `"ok":true`, alerting `NOTIFY_EMAIL` on failure (set up 2026-04-28)
- [ ] You can log into Cloudflare dashboard from your phone
- [ ] You can log into Netlify dashboard from your phone
- [ ] You can log into Supabase dashboard from your phone
- [ ] You can log into Stripe dashboard from your phone
- [ ] You can log into Resend dashboard from your phone
- [ ] `npx wrangler` is installed and authenticated locally on your laptop
- [ ] This document is bookmarked
- [ ] `NOTIFY_EMAIL` is set as a Worker secret and points at an inbox you check during business hours

---

## Known-stable Worker versions

After every successful deploy, `npx wrangler deploy` prints `Current Version ID:`. Save the most recent stable IDs here so you can roll back to a known-good version without hunting through the list. Format:

```
2026-04-25  91fa63bc-801d-4708-9538-f94f5cf05542  — week_posts.N admin save-module
2026-04-25  7a67e939-a0ce-48cf-a299-82685c3124fa  — public signup locked down
2026-04-25  7d712593-facd-4123-9093-d2204a058557  — longer 429 backoff
```

Keep the last 3-5 entries. Add new entries to the top after each deploy.

---

## Architecture refresh (so you don't have to re-derive it under stress)

```
Buyer → Stripe Payment Link
      → Stripe webhook → Worker /stripe/webhook → Supabase (placeholder client) + Resend (welcome email)
      → Buyer clicks setup link → launch.html?setup=TOKEN → /auth/resolve-setup → /auth/complete-setup
      → Account upgraded; buyer enters intake
      → Intake auto-saves to Supabase via /auth/save-answers
      → Buyer hits Generate → 8 modules in 3 phases (Anthropic via Worker /ai)
      → /auth/complete persists output + auto-releases (Self) or holds for review (Guided)
      → Self-Guided: dashboard.html unlocks immediately
      → Guided: admin opens review modal → edits + Releases → email + dashboard unlocks
```

If a step in this chain breaks, check that step's service:
- Stripe webhook → Stripe dashboard + Worker tail
- Setup link → Worker `/auth/resolve-setup` + Supabase `clients.intake_answers._setup_completed_at`
- Generation → Worker `/ai` retries (1s/3s/9s for 5xx, 10s/30s/60s for 429) + Anthropic status
- Auto-release → Worker `/auth/complete` + Supabase `clients.intake_answers._strategy_released`

---

*Last updated: 2026-04-25. Update this file whenever the rollback steps change (e.g., new providers added, deploy commands change).*
