# Demo Script

Use this to demo Phase 1 cleanly before live provider wiring is complete.

## Before the demo

1. Ensure `.env.local` has `MOCK_MODE="true"`.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open [http://localhost:3000](http://localhost:3000).

## Suggested talk track

### 1. Open the landing page

Say:

```text
This is QR Launch Studio, a local-business campaign operating system built for the Ace stack.
```

### 2. Point at the input contract

Say:

```text
The entire flow starts from five inputs: business name, offer details, city, link, and visual style.
```

### 3. Submit the demo form

Say:

```text
Phase 1 already routes these inputs into a typed campaign API so the frontend contract is stable before live provider hookup.
```

### 4. Walk the results page

Cover:

- three poster outputs
- AI QR output
- jingle preview card
- promo video preview card
- captions and CTA
- cost story

### 5. Explain the architecture

Say:

```text
The UI is already modular. The app talks to a campaign service layer, which can use mock data now and later swap to Dify orchestration and Ace generation without changing the page components.
```

### 6. Close on Phase 2

Say:

```text
Next, the same response contract will be fed by the real Dify workflow and live Ace APIs for images, QR, music, video, and search.
```

## Demo fallback

If live keys are unavailable:

- keep `MOCK_MODE="true"`
- use the preset form data
- emphasize that the UI, API contract, docs, and provider boundaries are already implemented
