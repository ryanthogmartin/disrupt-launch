# Overnight Handoff — 2026-04-22

Three things shipped unattended overnight. All live in prod (Netlify + Cloudflare). Plan file: `~/.claude/plans/bright-rolling-ladybug.md`.

## ✅ What shipped

### 1. Guided pivot — "client fills intake, strategist refines + releases"

The Guided flow you green-lit earlier is now the actual flow.

**New end-to-end for a Guided buyer:**
1. Pay on Stripe → redirected to `launch.html?tier=guided`
2. Welcome screen with Guided-specific footer: *"After your intake, your DISRUPT strategist reviews + releases your strategy within 1 business day."*
3. Account setup (same as Self-Guided)
4. Fill the 6-section intake
5. Parallel generation runs (~2–3 min — see #2 below)
6. Lands on **"Your strategy is with your DISRUPT strategist"** waiting screen
7. Client is told to expect an email within 1 business day when you release

**New end-to-end for a Self-Guided buyer:** unchanged flow, but now with parallel generation (~2–3 min instead of ~15–20). Self-Guided auto-releases on generation-complete; the client sees their strategy + dashboard immediately.

**What changed under the hood:**
- Old `screen-guided-done` ("wait for a call") removed from launch.html.
- New `screen-strategy-review` added for Guided post-generation + returning-login state.
- Worker's `computeClientState` now returns `strategy-under-review` for Guided clients until the strategist releases (new state).
- `_strategy_released` flag gates client visibility of the 8 modules (auto-true for Self-Guided on generation complete; false for Guided until you release).
- `_strategy_generated_output` persisted to `clients.intake_answers` so you can edit in the admin queue.

### 2. Parallel generation + silent retries

- All 8 modules now generate **concurrently** via `Promise.allSettled`. Total: ~2–3 min (limited by the slowest single module).
- Any module that fails on first attempt gets one **silent retry** pass before surfacing anything to the user.
- Worker-side `/ai` wrapper now retries transient Anthropic errors (429/500/502/503/529 + network) with **1s/3s/9s exponential backoff**, 3 attempts. Browser never sees these.
- `max_tokens` bumped **4000 → 8000** for roadmap, scripts, and week1 modules (the ones that hit truncation before).
- New 8-module grid UI on the generating screen — each card flips from spinner `⟳` to green check `✓` as its promise settles. Much better perceived progress.
- If a module STILL fails after Worker retry + browser retry, you see a retry screen listing **only the failed modules** by name (not the whole batch). Previously one failure killed all 8.

### 3. Admin Guided Review Queue

New section in dashboard.html admin view (top, yellow-accented rows).

**How to use:**
1. Log into dashboard.html as admin
2. Look for **"Guided Review Queue"** section on the home tab (shows count in the stat row too)
3. Click **"Open Review →"** on any row — opens a full-screen modal with all 8 modules in edit mode
4. Edit any module's text in its `<textarea>`. The "Save" button enables when dirty. Click Save per module.
5. When ready, click the pink **"Release to Client →"** button at the bottom. Confirmation dialog → email fires → row leaves the queue.
6. Client gets the "Your DISRUPT Launch strategy is released" email with a Guided-specific note: *"Your DISRUPT strategist will email you separately within 1–2 business days to schedule your walkthrough call."*

## ⚠️ Important: send the walkthrough call email manually

Per your call on scheduling, the release email tells the client you'll be in touch separately to schedule their walkthrough call. **You have to actually send that email.** No Calendly integration, no automation. Just watch the dashboard queue for rows that leave the queue (= released) and email them directly.

## 🔎 Verify in the morning — 5 minutes

1. Hit https://launch.disruptmedia.co/launch.html?tier=guided and make sure the welcome screen renders with the new tier footer.
2. Hit https://launch.disruptmedia.co/launch.html?tier=self — same welcome, different footer note.
3. Fire test emails to your inbox so you can review all copy again (new Guided welcome + new Guided intake-complete + Guided-variant release email):
   ```
   curl -X POST https://disrupt-proxy.disruptmedia.workers.dev/test-emails \
     -H "Content-Type: application/json" \
     -H "Origin: https://launch.disruptmedia.co" \
     -H "X-Disrupt-Token: disrupt-2026-key" \
     --data '{"to":"ryan@disruptmedia.co"}'
   ```
   Expect 8 emails this time (welcome-self, welcome-guided, password-reset, contact-admin, strategy-admin, strategy-client-self, strategy-client-guided, guided-intake-complete). The batch paces itself to avoid Resend's 5/sec rate limit.
4. Log into dashboard.html as admin — the "In Review Queue" stat should show **0** (no real Guided clients yet). If you want to see the UI populated, fake a Guided client in Supabase (see below).

### How to fake a Guided-in-review client for testing

Easiest way: run an intake yourself on the live site with `?tier=guided`, pay with a 100%-off coupon, go through the 6 sections, let generation complete. You'll land on the review-waiting screen. Then open dashboard.html as admin — your test client shows up in the queue.

Alternatively, in Supabase SQL editor:
```sql
UPDATE clients
SET intake_answers = intake_answers || '{"_tier":"guided","_intake_complete":true,"_strategy_released":false,"_generated_at":"2026-04-22T14:00:00Z","_strategy_generated_output":{"goals":"sample","competitors":"sample","brand":"sample","personas":"sample","scripts":"sample","preneed":"sample","roadmap":"sample","week1":"sample"}}'::jsonb
WHERE email = '<your-test-account>';
```

## 📝 Decisions I made autonomously

- **New Guided welcome email copy** — rewrote the one I sent last night to match the new flow ("start your intake now while your strategist preps"). Top-of-email pink block explains the Guided model upfront before steps. CTA: "Start My Intake →".
- **New transactional email**: `sendGuidedIntakeCompleteEmail` — fires the moment a Guided client finishes intake + generation. Tells them their strategy is under review. No preview of modules in the email (you can veto this if you'd rather they see a snippet).
- **Strategy-ready email** now has a tier-aware variant: when fired from `/admin/release-strategy`, it includes a "your strategist will email you separately within 1–2 business days" note in a pink callout. Self-Guided version unchanged.
- **Admin review modal styling**: full-screen overlay, dark backdrop, pink Release button. Matches DISRUPT brand. Textareas are monospace 13px, 280px min-height, resize-vertical. Save button per module auto-enables on edit.
- **Review-queue stat label**: "In Review Queue" (not "Guided Review Queue") in the admin stat row to save horizontal space on mobile. Full label shows in the section heading.
- **Failed-modules retry copy**: "We couldn't generate X of your 8 modules (<names>). Your answers are saved. Click Try Again to re-run just the missing modules." Clicking Try Again re-runs ONLY the failed ones, not the whole batch — preserves successful output.

## 🐛 Known gaps + follow-ups (not critical for conference)

1. **Dashboard Strategy tab is still hardcoded demo content.** Wiring up `renderStrategyGoals()`, `renderStrategyCompetitors()`, etc. to actually read from `intake_answers._strategy_generated_output` is a real task — maybe 2–3 hours of careful formatting work. Not done tonight. Impact: when a client lands on their dashboard post-release, they see the PRE-WRITTEN demo strategy content, not their real generated strategy. They'll still have access to it in the email and Sheets log, but the dashboard Strategy tab won't reflect their actual output. **Highest-priority follow-up for after the conference.**

2. **Legacy `buildStrategyEmailHtml` in worker.js** — orphaned since we switched to the admin/client split. Safe to delete but I left it alone to minimize diff risk. Cleanup later.

3. **No cancel-release or unrelease button.** Once you release, there's no one-click "oops, take it back." You'd have to flip `_strategy_released: false` in Supabase manually. Adding an Unrelease button is 10 min of work if you want it.

4. **No bulk actions in the queue.** If you ever have 5+ Guided clients waiting, you open each one individually. Non-issue for conference scale.

5. **No indicator that a module was edited after AI-generation.** If you want to see "edited by strategist" vs. "as-generated" in the future, we'd need to track before/after text. Not in tonight's scope.

## 🚢 What's in production right now

- **Frontend** — commit `f862d06` on `main` → Netlify auto-deployed.
- **Worker** — Version ID `0befb144-0521-4b6e-9931-18c1077f5eea` on `disrupt-proxy.disruptmedia.workers.dev`.
- All smoke tests passed:
  - Prod `/launch.html` serves new markup (confirmed `screen-strategy-review` present, `screen-guided-done` absent).
  - `/admin/save-module` and `/admin/release-strategy` correctly 403 with bad tokens.
  - Preview (localhost) E2E stubbed test: all 8 modules parallel-flip to done, Guided routes to review screen, Self routes to output screen, silent retry resolves transient errors, admin modal opens + saves.

## 📧 Email discipline

**Zero emails sent to your inbox overnight.** You're the one to kick off the test batch in the morning (command above).

## 🔧 If something breaks

- **Clients aren't appearing in the Guided queue** — check that `intake_answers._tier === 'guided'` AND `_intake_complete === true` AND `_strategy_released !== true`. Run the SQL filter in Supabase to verify.
- **Modules don't load in review modal** — check browser console. If `SESSION.allClients` doesn't include `intake_answers` with `_strategy_generated_output`, the Supabase select may be filtering it. Line 579 does `select: '*, metrics(*), week_progress(*)'` which includes `intake_answers` — should be fine.
- **Release button throws 403** — your admin JWT expired. Log out + back in.
- **"Failed to generate X modules"** after retries — something real is wrong at Anthropic. Check `npx wrangler tail` in the disrupt-worker dir.

---

*Previous handoff content archived. This replaces it in full. — Claude, overnight build 2026-04-22*
