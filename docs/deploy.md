# Deploy Setup

This repo is prepared for both GitHub and Netlify without forcing an immediate live deploy.

## GitHub

- The repo includes a CI workflow at `.github/workflows/ci.yml`
- On push or pull request, GitHub Actions will run:
  - `npm ci`
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`

## Netlify

- The repo includes `netlify.toml`
- Netlify should detect this as a Next.js app
- Build command:
  - `npm run build`
- Local Netlify dev command:
  - `npm run dev:netlify`

## Production Environment Variables

Add the same values from your local `.env.local` into the Netlify project environment settings before the first production deploy.

Minimum expected values:

- `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_APP_URL`
- `MOCK_MODE`
- `ALLOW_MOCK_FALLBACK`
- `ACE_API_BASE_URL`
- `ACE_API_KEY`
- `ACE_IMAGE_ENDPOINT`
- `ACE_MUSIC_ENDPOINT`
- `ACE_VIDEO_ENDPOINT`
- `ACE_SEARCH_ENDPOINT`
- `ACE_IMAGE_MODEL`
- `ACE_MUSIC_MODEL`
- `ACE_VIDEO_MODEL`
- `DIFY_MODEL_LABEL`
- `DIFY_API_BASE_URL`
- `DIFY_API_KEY`

Optional values:

- `DIFY_WORKFLOW_ID`
- `ACE_PLATFORM_TOKEN`
- `ACE_X402_ORDER_ID`
- `ACE_X402_PRIVATE_KEY`

## Recommended Order

1. Push the repo to GitHub
2. Confirm GitHub Actions passes
3. Link the GitHub repo in Netlify
4. Copy environment variables into Netlify
5. Trigger the first deploy when ready
