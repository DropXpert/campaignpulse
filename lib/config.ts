function asBoolean(value: string | undefined, defaultValue: boolean) {
  if (value === undefined) {
    return defaultValue;
  }

  return value.toLowerCase() === "true";
}

export const appConfig = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || "CampaignPulse",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  mockMode: asBoolean(process.env.MOCK_MODE, true),
  allowMockFallback: asBoolean(process.env.ALLOW_MOCK_FALLBACK, true),
  ace: {
    baseUrl: process.env.ACE_API_BASE_URL || "",
    apiKey: process.env.ACE_API_KEY || "",
    apiKeys: {
      images: process.env.ACE_IMAGE_API_KEY || process.env.ACE_API_KEY || "",
      qr: process.env.ACE_QR_API_KEY || process.env.ACE_API_KEY || "",
      music: process.env.ACE_MUSIC_API_KEY || process.env.ACE_API_KEY || "",
      video: process.env.ACE_VIDEO_API_KEY || process.env.ACE_API_KEY || "",
      search: process.env.ACE_SEARCH_API_KEY || process.env.ACE_API_KEY || ""
    },
    appIdHeader: process.env.ACE_APP_ID_HEADER || "X-App-Id",
    appIds: {
      images: process.env.ACE_IMAGE_APP_ID || process.env.ACE_APP_ID || "",
      qr: process.env.ACE_QR_APP_ID || process.env.ACE_APP_ID || "",
      music: process.env.ACE_MUSIC_APP_ID || process.env.ACE_APP_ID || "",
      video: process.env.ACE_VIDEO_APP_ID || process.env.ACE_APP_ID || "",
      search: process.env.ACE_SEARCH_APP_ID || process.env.ACE_APP_ID || ""
    },
    platformToken: process.env.ACE_PLATFORM_TOKEN || "",
    endpoints: {
      images: process.env.ACE_IMAGE_ENDPOINT || "/v1/images/generate",
      qr: process.env.ACE_QR_ENDPOINT || "/v1/qr/generate",
      music: process.env.ACE_MUSIC_ENDPOINT || "/v1/music/generate",
      video: process.env.ACE_VIDEO_ENDPOINT || "/v1/video/generate",
      search: process.env.ACE_SEARCH_ENDPOINT || "/v1/search/trends"
    },
    models: {
      image: process.env.ACE_IMAGE_MODEL || "nano-banana-2",
      music: process.env.ACE_MUSIC_MODEL || "chirp-v3-5",
      video: process.env.ACE_VIDEO_MODEL || "doubao-seedance-1-0-pro-250528"
    },
    difyModelLabel: process.env.DIFY_MODEL_LABEL || "GPT-5.5 via Dify"
  },
  dify: {
    baseUrl: process.env.DIFY_API_BASE_URL || "",
    apiKey: process.env.DIFY_API_KEY || "",
    appId: process.env.DIFY_APP_ID || "",
    workflowId: process.env.DIFY_WORKFLOW_ID || ""
  },
  x402: {
    orderId: process.env.ACE_X402_ORDER_ID || "",
    privateKey: process.env.ACE_X402_PRIVATE_KEY || ""
  }
};

export function hasDifyConfig() {
  return Boolean(appConfig.dify.baseUrl && appConfig.dify.apiKey);
}

export function hasAceConfig() {
  return Boolean(
    appConfig.ace.baseUrl &&
      (appConfig.ace.apiKey ||
        appConfig.ace.apiKeys.images ||
        appConfig.ace.apiKeys.music ||
        appConfig.ace.apiKeys.video ||
        appConfig.ace.apiKeys.search)
  );
}

export function hasX402Config() {
  return Boolean(
    appConfig.ace.platformToken && appConfig.x402.orderId && appConfig.x402.privateKey
  );
}

export function hasX402BootstrapConfig() {
  return Boolean(appConfig.ace.platformToken && appConfig.x402.orderId);
}
