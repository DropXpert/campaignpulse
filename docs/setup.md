# Setup

This app runs in mock mode by default, but the repo now includes the setup path for a real Ace contest entry.

## 1. Install

```powershell
npm install
```

## 2. Create local env file

```powershell
Copy-Item .env.example .env.local
```

## 3. Review required environment values

Mock/demo mode:

- `MOCK_MODE="true"`
- `ALLOW_MOCK_FALLBACK="true"`

Ace live integration:

- set `ACE_API_BASE_URL`
- set service-specific Ace keys when each acquired product gives a different credential:
  - `ACE_IMAGE_API_KEY` for Nano Banana or the selected image model
  - `ACE_MUSIC_API_KEY` for Suno Music
  - `ACE_VIDEO_API_KEY` for Seedance Video
  - `ACE_SEARCH_API_KEY` for Search Engine
  - `ACE_QR_API_KEY` only if you later enable Ace QR Art
- set service-specific Ace app ids if the Ace product page gives one:
  - `ACE_IMAGE_APP_ID`
  - `ACE_MUSIC_APP_ID`
  - `ACE_VIDEO_APP_ID`
  - `ACE_SEARCH_APP_ID`
- set `ACE_APP_ID_HEADER` only if Ace documents a header name other than `X-App-Id`
- optionally set `ACE_API_KEY` only as a fallback if the same key works across all services
- optionally set `ACE_APP_ID` only as a fallback if the same app id works across all services
- confirm all `ACE_*_ENDPOINT` paths
- set latest supported model ids with `ACE_IMAGE_MODEL`, `ACE_MUSIC_MODEL`, and `ACE_VIDEO_MODEL`
- set `ACE_PLATFORM_TOKEN` if you want to test x402 payments
- set `DIFY_MODEL_LABEL` to the model configured inside Dify, for example `GPT-5.5 via Dify`

Official places to start:

- platform dashboard: [https://platform.acedata.cloud](https://platform.acedata.cloud)
- documentation: [https://docs.acedata.cloud/en](https://docs.acedata.cloud/en)
- contest/hub entry point: [https://hub.acedata.cloud](https://hub.acedata.cloud)

How to get Ace credentials:

- login on the Ace platform
- open the product page you want, such as image, QR, Suno, or video
- click `Acquire`
- copy the returned credential into `.env.local`

Dify live orchestration:

- set `DIFY_API_BASE_URL`
- set `DIFY_API_KEY`
- optionally set `DIFY_APP_ID` from the Dify Studio URL for reference
- optionally set `DIFY_WORKFLOW_ID` if you want the app to call `/workflows/{workflow_id}/run`
- leave `DIFY_WORKFLOW_ID` empty if you want the app-scoped API key to call `/workflows/run`
- configure GPT-5.5 inside the Dify LLM node, then set `DIFY_MODEL_LABEL="GPT-5.5 via Dify"` for the result proof section

x402 payment:

- set `ACE_PLATFORM_TOKEN` and `ACE_X402_ORDER_ID` to check the payment requirement from `/billing`
- set `ACE_X402_PRIVATE_KEY` only when you are ready to wire signed `X-PAYMENT` completion server-side
- keep enough USDC on Base for the payment wallet

## 4. Run the app

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 5. Current runtime behavior

- If `MOCK_MODE=true`, the app always returns mock campaign assets.
- If `MOCK_MODE=false` and Dify config is incomplete, the app falls back to mock output when `ALLOW_MOCK_FALLBACK=true`.
- The landing page sends the campaign brief to `/results`.
- The results page calls `/api/campaign`.
- `/api/campaign` routes through `lib/campaign/service.ts`.
- `/billing` checks the x402 payment requirement through `/api/x402/requirements`.

## 6. Where to add real provider logic

- Ace wrappers: `lib/ace/client.ts`
- Dify wrapper: `lib/dify/client.ts`
- response mapping and orchestration: `lib/campaign/service.ts`

## 7. Notes

- The repo planning document currently uses the filename `implemention.md`.
- The app preserves a stable typed response contract so the UI does not need to be rebuilt when live providers are connected.
- The setup dashboard is available at `/setup`.
