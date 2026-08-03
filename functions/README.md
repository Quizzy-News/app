# Quizzy.News — daily quiz generator

Replacement for the original `getdailygemini` Cloud Function, which stopped
writing to Firestore on **2026-05-05** and now returns HTTP 500.

Use this if the volunteers' original source can't be recovered from
Cloud Storage, or if repairing it turns out to be more work than replacing it.

## What it does

| Export | Type | Purpose |
|---|---|---|
| `generateDailyQuiz` | Scheduled, 05:30 America/New_York | Fetches top headlines, generates questions, writes `dailies/<YYYY-MM-DD>` |
| `generateQuizNow` | HTTPS | Same work on demand — use it to confirm a fix without waiting for tomorrow |
| `quizHealth` | HTTPS, public | JSON health report. 200 if a quiz was published in the last 2 days, 503 otherwise |

## Why it won't repeat the old failures

- **`approved` is written explicitly, clean, and `false`.** The original wrote
  `"approved "` with a trailing space on at least three days, which silently
  emptied those quizzes. A test asserts no field name carries whitespace.
- **It refuses to publish a broken day.** If fewer than 5 questions survive
  validation, it throws instead of writing a document that looks fine and
  plays as a white screen.
- **Every question is validated before it's stored** — the answer must be one
  of the choices, choices must be unique, and self-referential questions
  ("Based on the article excerpt…") are rejected outright. The old generator
  produced a lot of those.
- **Rejected questions are recorded** in `stats` and `rejected` on the document,
  so a degrading model shows up in the data rather than as a mystery.
- **`quizHealth` exists**, so the next stall is caught in a day, not a quarter.

## Setup

```bash
cd functions
npm install
npm test          # 27 tests, no network required
```

Set the two secrets:

```bash
firebase functions:secrets:set GEMINI_API_KEY
firebase functions:secrets:set NEWS_API_KEY
```

- Gemini key: https://aistudio.google.com/apikey
- NewsAPI key: https://newsapi.org/register (the existing archive's `source`
  objects — `{id: "axios", name: "Axios"}` — are NewsAPI's exact shape, so this
  is almost certainly what the volunteers used)

Deploy:

```bash
firebase deploy --only functions --project qz-news
```

## Choosing a model

Default is `gemini-2.5-flash`. Override without redeploying code:

```bash
firebase functions:config:unset   # not needed on 2nd gen
firebase deploy --only functions --set-env-vars GEMINI_MODEL=gemini-2.5-flash-lite
```

**Important:** `gemini-2.0-flash` and `gemini-2.0-flash-lite` were shut down on
**1 June 2026**. Any code still requesting them gets a 404 from the API. If you
recover the original function's source and it names a 2.0 model, that is why it
cannot work today — though note it stopped publishing on **5 May**, *before*
that shutdown, so the 2.0 retirement is a second, separate blocker rather than
the original cause. Expect to find two problems, not one.

## Other configuration

| Variable | Default | Meaning |
|---|---|---|
| `GEMINI_MODEL` | `gemini-2.5-flash` | Model name |
| `NEWS_SOURCES` | `axios,associated-press,reuters,npr,bbc-news,the-verge,politico,bloomberg` | NewsAPI source ids |
| `QUESTIONS_TARGET` | `15` | Articles to turn into questions per day |

## Monitoring

After deploying, the health endpoint is:

```
https://us-central1-qz-news.cloudfunctions.net/quizHealth
```

Point any uptime monitor at it with a 30-minute interval and email alerts.
It returns 503 once no quiz has been published for more than 2 days, which is
what turns a silent twelve-week outage into a same-day email.
