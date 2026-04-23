import { appConfig, hasAceConfig } from "@/lib/config";
import { readAceCache, writeAceCache } from "@/lib/ace/cache";

type JsonRecord = Record<string, unknown>;
type AceService = "images" | "music" | "video" | "search";

interface AceImageResponse {
  success?: boolean;
  task_id?: string;
  data?: Array<{
    prompt?: string;
    image_url?: string;
    url?: string;
  }>;
}

interface AceMusicResponse {
  success?: boolean;
  task_id?: string;
  data?: Array<{
    id?: string;
    title?: string;
    lyric?: string;
    audio_url?: string;
    image_url?: string;
    state?: string;
  }>;
}

interface AceVideoResponse {
  success?: boolean;
  task_id?: string;
  data?: {
    task_id?: string;
    status?: string;
    video_url?: string;
    image_url?: string;
    last_frame_url?: string;
    model?: string;
  };
}

interface AceTaskResponse {
  id?: string;
  request?: JsonRecord;
  response?: {
    success?: boolean;
    data?: {
      task_id?: string;
      status?: string;
      video_url?: string;
      image_url?: string;
      last_frame_url?: string;
      model?: string;
    };
  };
}

interface AceSearchResponse {
  organic?: Array<{
    title?: string;
    link?: string;
    snippet?: string;
  }>;
}

function readString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

async function callAce<T>(
  service: AceService,
  path: string,
  payload: JsonRecord,
  timeoutMs = 120000
): Promise<T> {
  if (!hasAceConfig()) {
    throw new Error("Ace config is incomplete. Add ACE_API_BASE_URL and at least one Ace API key.");
  }

  const apiKey = appConfig.ace.apiKeys[service] || appConfig.ace.apiKey;
  const appId = appConfig.ace.appIds[service];

  if (!apiKey) {
    throw new Error(`Ace ${service} API key is missing.`);
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${apiKey}`
  };

  if (appId) {
    headers[appConfig.ace.appIdHeader] = appId;
  }

  const response = await fetch(`${appConfig.ace.baseUrl}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    cache: "no-store",
    signal: AbortSignal.timeout(timeoutMs)
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Ace request failed with status ${response.status}. ${detail}`);
  }

  return (await response.json()) as T;
}

export async function generateImage(prompt: string) {
  const cacheKey = JSON.stringify({
    endpoint: appConfig.ace.endpoints.images,
    prompt
  });
  const cached = await readAceCache<{ imageUrl: string }>("images", cacheKey);

  if (cached?.imageUrl) {
    return cached;
  }

  const response = await callAce<AceImageResponse>("images", appConfig.ace.endpoints.images, {
    action: "generate",
    prompt,
    count: 1,
    model: "nano-banana-2",
    aspect_ratio: "3:4"
  });

  const imageUrl = readString(response.data?.[0]?.image_url || response.data?.[0]?.url);

  if (!imageUrl) {
    throw new Error("Ace image generation completed without an image URL.");
  }

  const result = {
    imageUrl
  };

  await writeAceCache("images", cacheKey, result);

  return result;
}

export async function generateMusic(prompt: string, title: string) {
  const cacheKey = JSON.stringify({
    endpoint: appConfig.ace.endpoints.music,
    prompt,
    title
  });
  const cached = await readAceCache<{
    title: string;
    lyric: string;
    audioUrl: string;
    imageUrl: string;
  }>("music", cacheKey);

  if (cached?.audioUrl || cached?.imageUrl) {
    return cached;
  }

  const response = await callAce<AceMusicResponse>("music", appConfig.ace.endpoints.music, {
    action: "generate",
    prompt,
    title,
    custom: false,
    instrumental: false,
    model: "chirp-v3-5"
  });

  const track = response.data?.find((item) => readString(item.audio_url)) || response.data?.[0];

  if (!track) {
    throw new Error("Ace music generation completed without a track.");
  }

  const result = {
    title: readString(track.title) || title,
    lyric: readString(track.lyric),
    audioUrl: readString(track.audio_url),
    imageUrl: readString(track.image_url)
  };

  await writeAceCache("music", cacheKey, result);

  return result;
}

async function retrieveSeedanceTask(taskId: string) {
  return callAce<AceTaskResponse>("video", "/seedance/tasks", {
    id: taskId,
    action: "retrieve"
  });
}

export async function generateVideo(prompt: string, imageUrl?: string) {
  const cacheKey = JSON.stringify({
    endpoint: appConfig.ace.endpoints.video,
    prompt,
    imageUrl: imageUrl || ""
  });
  const cached = await readAceCache<{
    videoUrl: string;
    previewImageUrl: string;
    storyboard: string[];
  }>("video", cacheKey);

  if (cached?.videoUrl) {
    return cached;
  }

  const content: JsonRecord[] = [];

  if (imageUrl) {
    content.push({
      type: "image_url",
      image_url: {
        url: imageUrl
      }
    });
  }

  content.push({
    type: "text",
    text: prompt
  });

  const response = await callAce<AceVideoResponse>("video", appConfig.ace.endpoints.video, {
    model: "doubao-seedance-1-0-pro-250528",
    content,
    ratio: "9:16",
    resolution: "720p",
    duration: 5,
    watermark: false,
    service_tier: "flex",
    return_last_frame: true
  });

  let data = response.data;
  const rootTaskId = readString(response.task_id) || readString(response.data?.task_id);

  if ((!data?.video_url || data.status !== "succeeded") && rootTaskId) {
    for (let attempt = 0; attempt < 12; attempt += 1) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const task = await retrieveSeedanceTask(rootTaskId);
      const taskData = task.response?.data;

      if (!taskData) {
        continue;
      }

      data = taskData;

      if (taskData.status === "succeeded" && readString(taskData.video_url)) {
        break;
      }
    }
  }

  const videoUrl = readString(data?.video_url);

  if (!videoUrl) {
    throw new Error("Ace video generation did not return a video URL.");
  }

  const result = {
    videoUrl,
    previewImageUrl: readString(data?.last_frame_url || data?.image_url),
    storyboard: [
      "Introduce the offer in the opening frame.",
      "Show the product or venue in motion.",
      "End on a strong CTA with the destination link."
    ]
  };

  await writeAceCache("video", cacheKey, result);

  return result;
}

export async function searchTrends(query: string) {
  const response = await callAce<AceSearchResponse>(
    "search",
    appConfig.ace.endpoints.search,
    {
      page: 1,
      type: "search",
      query,
      number: 5,
      language: "en"
    },
    30000
  );

  return response.organic || [];
}
