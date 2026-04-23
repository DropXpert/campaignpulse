# CampaignPulse

Local Business Campaign OS powered by Next.js, Dify, and Ace Data Cloud.

CampaignPulse turns one local business offer into a campaign board with poster directions, a scannable QR path, launch copy, audio direction, video direction, and cost context.

## What It Does

- Collects a campaign brief from a local business
- Uses Dify for campaign strategy, copy, and prompt orchestration
- Uses Ace Data Cloud adapters for image, music, video, and search-ready outputs
- Generates a real scannable QR destination
- Shows a cost comparison with x402 and $ACE discount modeling
- Falls back gracefully if a provider is unavailable or credits are exhausted

## Tech Stack

- Next.js App Router
- TypeScript
- Dify workflow API
- Ace Data Cloud API adapters
- Netlify-ready deployment config

## Local Setup

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open:

```text
http://localhost:3000
```

## Environment

Use `.env.example` as the template. Add real provider keys only to `.env.local` or your hosting provider environment settings.

Do not commit `.env.local`.

## Main Routes

- `/` - product landing page
- `/campaign` - campaign brief builder
- `/results` - generated campaign board
- `/api/campaign` - campaign generation endpoint

## Deployment

The repo includes:

- `netlify.toml`
- `.github/workflows/ci.yml`
- setup docs in `docs/`

See [docs/deploy.md](docs/deploy.md).
