# Dify Workflow

This document maps the repo planning files into a Dify workflow contract that Phase 2 can implement directly.

## Target Node Order

1. Input Node
2. Brief Generator
3. Trend Search
4. Copy Generator
5. Prompt Optimizer
6. Asset Generation
7. Packager
8. Cost Calculator

## Expected Inputs

The frontend already sends this structure:

```json
{
  "businessName": "Biryani Box",
  "offerDetails": "Weekend combo: biryani + drink for 20% off.",
  "city": "Bengaluru",
  "link": "https://example.com/order",
  "visualStyle": "bold neon street-food premium"
}
```

In Dify, map these into workflow variables:

- `business_name`
- `offer_details`
- `city`
- `link`
- `visual_style`

## Planned Outputs

The frontend Phase 1 shell expects a future normalized response that can be converted into this contract:

- `brief`
- `prompts.imagePrompts`
- `prompts.qrPrompt`
- `prompts.musicPrompt`
- `prompts.videoPrompt`
- `images`
- `qrCode`
- `music`
- `video`
- `captions`
- `cta`
- `costBreakdown`

## Node Guidance

### 1. Input Node

Accept the five campaign fields from the app.

### 2. Brief Generator

Goal:
- infer audience
- infer tone
- define campaign theme
- pull keywords

Suggested prompt:

```text
Convert the business input into a structured local-marketing brief with target audience, campaign theme, tone, hooks, and useful keywords.
```

### 3. Trend Search

Query pattern:

```text
{business_name} {city} trends marketing competitors
```

Return:

- trend keywords
- competitor angles

### 4. Copy Generator

Generate:

- 3 headlines
- social captions
- CTA

### 5. Prompt Optimizer

Generate:

- 3 poster prompts
- 1 QR prompt
- 1 music prompt
- 1 video prompt

### 6. Asset Generation

Call Ace services for:

- image generation
- QR art
- music/Suno
- video

### 7. Packager

Combine the workflow outputs into a stable JSON object.

### 8. Cost Calculator

Estimate:

- image cost
- QR cost
- music cost
- video cost

Also calculate:

- x402 discount
- optional $ACE discount
- savings vs traditional subscriptions

## Integration Notes

- `lib/dify/client.ts` already sends a placeholder `POST /workflows/run` request.
- `lib/campaign/service.ts` is the handoff point where the Dify output should be normalized into the app response.
- Keep Dify output field names explicit to avoid frontend rewrites later.
