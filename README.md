# Quotebolt

Contractors — stop writing quotes by hand. Describe the job in plain words, get an itemized quote with labor, materials, and markup.

**Status:** v0 skeleton — landing page + mocked quote generator. Full AI not yet wired.

**Landing:** https://quotebolt.vercel.app

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 |
| Fonts | Inter via `next/font/google` |
| Hosting | Vercel (zero config) |
| Waitlist | https://waitlist-api-sigma.vercel.app |

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Deploy

Push to `main` — Vercel picks it up automatically. No environment variables required.

## Routes

| Route | Description |
|---|---|
| `/` | Landing page (original copy + design preserved) |
| `/try` | Describe a job, get a mocked itemized quote (labor, materials, markup) |
| `/api/waitlist` | `POST { email }` → forwards to waitlist-api-sigma |

## What's next

- Wire real AI (job description → accurate quote generation)
- Voice-to-quote on mobile
- One-click quote → invoice conversion
