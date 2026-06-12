# Worker source moved

The production Cloudflare Worker (`disrupt-proxy`) is NOT deployed from this
repo. Its source of truth lives in its own git repo at:

    ~/Desktop/disrupt-worker

The stale copy that used to live here was a 115-line early prototype (only
`/ai` + `/deliver`). Deploying it would have overwritten the real worker —
which also serves `/health`, `/stripe/webhook`, all `/auth/*`, `/dashboard/*`,
and `/admin/*` routes — and taken down auth, payments, and the dashboard.

Deploy / rollback instructions: see ROLLBACK.md at the repo root.
