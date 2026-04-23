import {
  generateImage,
  generateMusic,
  generateVideo
} from "@/lib/ace/client";
import { generateMockAceAssets } from "@/lib/ace/mock";
import { generateQrDataUrl } from "@/lib/ace/qr";
import type {
  CampaignAudioAsset,
  CampaignImageAsset,
  CampaignInput,
  CampaignPrompts,
  CampaignQrAsset,
  CampaignVideoAsset
} from "@/types/campaign";

interface LiveAceAssets {
  images: CampaignImageAsset[];
  qrCode: CampaignQrAsset;
  music: CampaignAudioAsset;
  video: CampaignVideoAsset;
}

export function hasRemoteAceAsset(assets: LiveAceAssets) {
  return (
    assets.images.some((image) => image.imageUrl.startsWith("http")) ||
    Boolean(assets.music.url) ||
    assets.music.previewImageUrl.startsWith("http") ||
    Boolean(assets.video.url) ||
    assets.video.previewImageUrl.startsWith("http")
  );
}

function withMarketingPolish(prompt: string, businessName: string) {
  return `${prompt}. Professional marketing creative for ${businessName}. Strong typography, commercial lighting, premium composition, clean readable layout.`;
}

export async function buildLiveAceAssets(
  input: CampaignInput,
  prompts: CampaignPrompts
): Promise<LiveAceAssets> {
  const fallback = generateMockAceAssets(input, prompts);
  const imageResults = await Promise.allSettled(
    prompts.imagePrompts.slice(0, 3).map(async (prompt, index) => {
      const image = await generateImage(withMarketingPolish(prompt, input.businessName));

      return {
        id: `${input.businessName.toLowerCase().replace(/\s+/g, "-")}-poster-${index + 1}`,
        title: `Poster ${index + 1}`,
        prompt,
        imageUrl: image.imageUrl
      } satisfies CampaignImageAsset;
    })
  );

  const images = imageResults.map((result, index) =>
    result.status === "fulfilled" ? result.value : fallback.images[index]
  );

  const qrCodePromise = generateQrDataUrl(input.link)
    .then((imageUrl) => ({
      prompt: prompts.qrPrompt,
      imageUrl
    }))
    .catch(() => fallback.qrCode);

  const musicPromise = generateMusic(prompts.musicPrompt, `${input.businessName} Audio Spot`)
    .then((music) => ({
      title: music.title || `${input.businessName} Jingle Preview`,
      prompt: prompts.musicPrompt,
      lyricsIdea: music.lyric || `Hook: ${input.businessName} in ${input.city}, ${input.offerDetails}.`,
      previewImageUrl: music.imageUrl || fallback.music.previewImageUrl,
      url: music.audioUrl
    }))
    .catch(() => fallback.music);

  const videoPromise = generateVideo(prompts.videoPrompt, images[0]?.imageUrl)
    .then((video) => ({
      title: `${input.businessName} Promo Reel`,
      prompt: prompts.videoPrompt,
      storyboard: video.storyboard,
      previewImageUrl: video.previewImageUrl || images[0]?.imageUrl || fallback.video.previewImageUrl,
      url: video.videoUrl
    }))
    .catch(() => fallback.video);

  const [qrCode, music, video] = await Promise.all([
    qrCodePromise,
    musicPromise,
    videoPromise
  ] as const);

  return {
    images,
    qrCode,
    music,
    video
  };
}
