# Cost safety — how Quizzy.News stays free

## What happened, in one paragraph

On **5 May 2026** ("Cinco de Mayo" in Donovan's email), an API key with access
to the Gemini API was used by someone outside the project. Spending went from
about **$60/month** to roughly **$2,494 in five minutes**. Billing alerts fired,
but alerts only tell you after the fact — by the time anyone could react, it was
over. Google credited **$1,870.18** as a courtesy, leaving **$623.39** owed.
With no way to pay that, the billing account was disabled — which switched off
every backend service, which is why the daily quiz stopped that same day and the
site has been broken since.

**The outage and the security incident are the same event.** Everything in this
file exists so that it cannot happen twice.

---

## What it costs to run now

The replacement generator makes **one** Gemini call per day, batching every
article into a single request. Measured against real prompt sizes:

| | Per run | Per month (30 runs) |
|---|---|---|
| Input tokens | ~4,000 | ~119,000 |
| Output tokens | ~1,200 | ~36,000 |
| API calls | 1 | 30 |

| Model | Cost per month |
|---|---|
| `gemini-2.5-flash-lite` (default) | **$0.03** |
| `gemini-2.5-flash` | $0.13 |

The Gemini free tier allows roughly **1,500 requests per day**. We use **one**.
In practice quiz generation should cost nothing at all.

Everything else is inside permanent free tiers:

| Service | Free allowance | Quizzy's usage |
|---|---|---|
| Firestore reads | 50,000/day | a few hundred |
| Firestore writes | 20,000/day | ~20 |
| Cloud Run / Functions | 2M requests/month | ~50 |
| Cloud Scheduler | 3 jobs | 1 |
| Firebase Hosting | 10 GB transfer/month | small |

The old setup cost $60/month, roughly **2,000× more than this design**, which
suggests it was calling the model once per article — or repeatedly — rather
than batching.

---

## Layer 1 — Spend caps (the actual hard stop)

Google added **spend cap budgets** in July 2026. Unlike a budget *alert*, a
spend cap **blocks new usage** when the limit is hit. This is what Donovan meant
by "put an actual hard cap on the monthly spend," and it did not exist when the
incident happened.

Spend caps currently support exactly the services Quizzy uses: **Gemini API,
Cloud Run, and Cloud Run functions**.

**Set up two of them** at https://console.cloud.google.com/billing → Budgets & alerts
→ Create Budget:

| Budget | Scope: service | Amount |
|---|---|---|
| `quizzy-gemini-cap` | Gemini API | **$2/month** |
| `quizzy-run-cap` | Cloud Run | **$2/month** |

For each: choose **Spend cap enforcement** (not "Alerts only"), scope to project
`qz-news` and that one service, set the amount, then Finish.

$2 is roughly 60× our expected spend, so normal operation will never approach
it — but it turns a runaway from $2,494 into at most a couple of dollars.

**Caveats worth knowing:**

- Preview feature, so it may change.
- One project + one service per cap, monthly periods only.
- Enforcement is based on *estimated* cost, so there's a short lag. It's a
  circuit breaker, not a laser. Combined with the quota in Layer 3, that's fine.
- When a cap trips, that service stops until you lift it manually. `quizHealth`
  (Layer 5) tells you the same day.

> I originally advised you to choose "Alerts only" over spend cap enforcement,
> on the reasoning that a cap can take your site down. Knowing this history,
> that advice was wrong. A few hours of downtime is recoverable; a $2,500 bill
> already killed this project once. Use the cap.

---

## Layer 2 — Lock down the API keys

This is the layer that actually failed in May.

**Check every key** at https://console.cloud.google.com/apis/credentials?project=qz-news

For each key listed, click it and set:

- **Application restrictions** → *Websites* → add `quizzy.news` and
  `qz-news.web.app`. (The web key is embedded in every visitor's browser — it
  cannot be secret, so restricting *where* it works is the protection.)
- **API restrictions** → *Restrict key* → tick **only**: Cloud Firestore API,
  Firebase Installations API, Identity Toolkit API.
  **Never tick Generative Language API on a key that ships to browsers.**

**Delete any key you don't recognise or can't account for.** If one of them is
the compromised key, deleting it is the fix.

I checked the two keys in your public GitHub history
(`AIzaSyDIpEdbHC…gyX-I` and `AIzaSyDM4o4L2c…Futg`) — both are already refused
by the Gemini API, so someone has restricted them. Good. Still worth confirming
in the console that no *other* key is unrestricted.

**The generator's Gemini key is different** — it is a server-side secret and
must never appear in the app, the repo, or a browser. It lives in Secret Manager:

```bash
firebase functions:secrets:set GEMINI_API_KEY
firebase functions:secrets:set NEWS_API_KEY
firebase functions:secrets:set RUN_TOKEN     # openssl rand -hex 24
```

Restrict that key too: API restrictions → **Generative Language API only**.

---

## Layer 3 — A per-day quota on the AI API

A quota is a true hard ceiling and takes effect instantly, with no billing lag.

https://console.cloud.google.com/iam-admin/quotas?project=qz-news

Filter to **Generative Language API**, find the per-day request limit, and set
it to **50**. We need one per day. Fifty is generous headroom and still makes a
runaway arithmetically impossible.

---

## Layer 4 — Guards inside the code

These ship in `functions/index.js` and need no configuration:

| Guard | What it prevents |
|---|---|
| One batched Gemini call per day | Per-article calling, the likely source of the old $60/month |
| `MAX_RUNS_PER_DAY = 3`, enforced by a Firestore transaction | A loop, a retry storm, or repeated triggers spending money |
| `generateQuizNow` requires a secret header | A public endpoint that costs money on every anonymous request |
| `MAX_PROMPT_CHARS = 30000` | A malformed feed producing an enormous prompt |
| `maxOutputTokens = 4000` | Being billed for an unbounded response |
| `maxInstances: 1` | Many copies running at once |
| `retryCount: 1` | Infinite retry loops |
| Keys via Secret Manager only | Credentials in the repo |

The daily cap is enforced *before* any paid call, in a Firestore transaction, so
it holds even if several triggers fire simultaneously.

---

## Layer 5 — Know within a day

Alerts alone didn't save you in May — the spend happened in five minutes. But
the *other* failure, the one that lasted twelve weeks, was nobody knowing the
quizzes had stopped.

Deploy the health endpoint and point a free monitor at it:

```
https://us-central1-qz-news.cloudfunctions.net/quizHealth
```

https://uptimerobot.com → Add New Monitor → HTTPS → 30-minute interval → email.

It returns an error once no quiz has been published for more than two days —
including when a spend cap has tripped.

---

## The order to do this in

1. **Spend caps first** (Layer 1) — before anything else runs.
2. **Audit and restrict keys** (Layer 2) — delete anything unrecognised.
3. **Set the API quota** (Layer 3).
4. Deploy the functions — Layer 4 comes with them.
5. **Set up the monitor** (Layer 5).

Only after 1–3 should the generator be allowed to run again.

---

## About moving to AWS

Donovan mentioned migrating quiz generation to AWS because he has credits there.
That's a reasonable option, but worth being clear about what it does and doesn't
solve: **it does not fix the underlying problem.** The May incident was a
credential exposure, and an exposed key on AWS Bedrock produces the same
outcome. AWS also has no true hard spend cap — Budgets there are alerts plus
optional actions, much like GCP before July 2026.

Given that this design costs about $0.03/month and fits inside the free tier,
the credits aren't worth a migration on their own. The arguments for moving are
Donovan's familiarity and his willingness to maintain it — those are real, and
worth weighing. But do the five layers above regardless of which cloud it runs on.
