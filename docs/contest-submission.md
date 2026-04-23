# Contest Submission Guide

This repo is now structured to support a real Ace contest entry. Use this checklist in order.

## 1. Acquire the required accounts and credentials

Ace:

- create/login at [https://platform.acedata.cloud](https://platform.acedata.cloud)
- open the product pages you want to use
- click `Acquire` on each service
- copy the API key or token into `.env.local`

Dify:

- create/login at [https://cloud.dify.ai](https://cloud.dify.ai)
- build the workflow described in `docs/dify-workflow.md`
- copy the workflow id and API key into `.env.local`

x402:

- create an order in the Ace platform
- keep the order id
- generate a platform token
- prepare a Base wallet with USDC

## 2. Run the app locally

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

## 3. Replace mock mode with real mode

In `.env.local`:

- set `MOCK_MODE="false"`
- keep `ALLOW_MOCK_FALLBACK="true"` until live output is verified

## 4. Generate real outputs

You need one successful end-to-end run that produces:

- image posters
- QR asset
- music asset
- video asset
- cost story

## 5. Deploy

The contest explicitly gives bonus points for Nexior deployments, so deploy the app once the live flow is stable.

## 6. Post on X

Your post should include:

- what you built
- which Ace tools you used
- cost story versus subscriptions
- app/demo link
- tags: `@acedatacloud #BuildWithAce #AceDataCloud`

## 7. Submit on Discord

Drop the X post link in `#campaign-submissions`.
