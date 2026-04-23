import { toSlug } from "@/lib/utils";
import type {
  CampaignAudioAsset,
  CampaignImageAsset,
  CampaignInput,
  CampaignPrompts,
  CampaignQrAsset,
  CampaignVideoAsset
} from "@/types/campaign";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildTextRows(value: string, maxChars: number) {
  const words = value.split(/\s+/);
  const rows: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;

    if (next.length <= maxChars) {
      current = next;
      continue;
    }

    if (current) {
      rows.push(current);
    }

    current = word;
  }

  if (current) {
    rows.push(current);
  }

  return rows.slice(0, 3);
}

function svgDataUri(svg: string) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function posterDataUri(
  brand: string,
  city: string,
  offer: string,
  label: string,
  accent: string
) {
  const titleRows = buildTextRows(brand, 14);
  const offerRows = buildTextRows(offer, 26);

  const titleSvg = titleRows
    .map(
      (row, index) =>
        `<text x="92" y="${232 + index * 84}" fill="#F8FAFC" font-family="Arial, Helvetica, sans-serif" font-size="66" font-weight="700">${escapeXml(row)}</text>`
    )
    .join("");

  const offerSvg = offerRows
    .map(
      (row, index) =>
        `<text x="92" y="${598 + index * 34}" fill="#D7E1F7" font-family="Arial, Helvetica, sans-serif" font-size="27">${escapeXml(row)}</text>`
    )
    .join("");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="1180" viewBox="0 0 900 1180" fill="none">
      <rect width="900" height="1180" rx="38" fill="#0A1020"/>
      <rect width="900" height="1180" rx="38" fill="url(#bg)"/>
      <circle cx="748" cy="160" r="204" fill="${accent}" fill-opacity="0.24"/>
      <circle cx="130" cy="1030" r="220" fill="#F8C55F" fill-opacity="0.12"/>
      <rect x="46" y="46" width="808" height="1088" rx="30" fill="white" fill-opacity="0.04" stroke="white" stroke-opacity="0.14"/>
      <text x="92" y="118" fill="#8EF5C7" font-family="Arial, Helvetica, sans-serif" font-size="24" letter-spacing="3">${escapeXml(label.toUpperCase())}</text>
      <text x="92" y="156" fill="#9FB0D2" font-family="Arial, Helvetica, sans-serif" font-size="24">${escapeXml(city)}</text>
      ${titleSvg}
      <rect x="92" y="490" width="248" height="56" rx="28" fill="${accent}"/>
      <text x="124" y="526" fill="#07111F" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700">Weekend Campaign</text>
      ${offerSvg}
      <rect x="92" y="982" width="716" height="90" rx="24" fill="#0E172A" stroke="white" stroke-opacity="0.12"/>
      <text x="124" y="1033" fill="#F8FAFC" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="700">Scan. Order. Convert.</text>
      <text x="124" y="1066" fill="#9FB0D2" font-family="Arial, Helvetica, sans-serif" font-size="20">Preview shell. Replace with live Ace creative.</text>
      <defs>
        <linearGradient id="bg" x1="92" y1="62" x2="842" y2="1138" gradientUnits="userSpaceOnUse">
          <stop stop-color="#0B1327"/>
          <stop offset="1" stop-color="#121D33"/>
        </linearGradient>
      </defs>
    </svg>
  `;

  return svgDataUri(svg);
}

function previewPanelDataUri(title: string, subtitle: string, accent: string) {
  const titleRows = buildTextRows(title, 14);
  const titleSvg = titleRows
    .map(
      (row, index) =>
        `<text x="82" y="${250 + index * 76}" fill="#F8FAFC" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="700">${escapeXml(row)}</text>`
    )
    .join("");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900" fill="none">
      <rect width="1200" height="900" rx="40" fill="#0A1020"/>
      <circle cx="1048" cy="182" r="196" fill="${accent}" fill-opacity="0.22"/>
      <circle cx="150" cy="748" r="186" fill="${accent}" fill-opacity="0.12"/>
      <rect x="58" y="58" width="1084" height="784" rx="30" fill="white" fill-opacity="0.04" stroke="white" stroke-opacity="0.14"/>
      <text x="82" y="114" fill="#8FD9FF" font-family="Arial, Helvetica, sans-serif" font-size="26" letter-spacing="4">${escapeXml(subtitle.toUpperCase())}</text>
      ${titleSvg}
      <rect x="82" y="666" width="400" height="70" rx="35" fill="${accent}"/>
      <text x="124" y="711" fill="#07111F" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700">Contest demo preview</text>
      <text x="82" y="804" fill="#A9B6CF" font-family="Arial, Helvetica, sans-serif" font-size="28">Designed for a cleaner mock shell until live Ace assets are wired.</text>
    </svg>
  `;

  return svgDataUri(svg);
}

function qrDataUri(label: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900" fill="none">
      <rect width="900" height="900" rx="44" fill="#111827"/>
      <rect x="90" y="90" width="720" height="720" rx="32" fill="#F8FAFC"/>
      <rect x="142" y="142" width="168" height="168" rx="24" fill="#111827"/>
      <rect x="590" y="142" width="168" height="168" rx="24" fill="#111827"/>
      <rect x="142" y="590" width="168" height="168" rx="24" fill="#111827"/>
      <rect x="214" y="214" width="24" height="24" fill="#F8FAFC"/>
      <rect x="662" y="214" width="24" height="24" fill="#F8FAFC"/>
      <rect x="214" y="662" width="24" height="24" fill="#F8FAFC"/>
      <g fill="#111827">
        <rect x="382" y="158" width="44" height="44" rx="10"/>
        <rect x="440" y="158" width="44" height="44" rx="10"/>
        <rect x="498" y="158" width="44" height="44" rx="10"/>
        <rect x="382" y="216" width="44" height="44" rx="10"/>
        <rect x="498" y="216" width="44" height="44" rx="10"/>
        <rect x="382" y="332" width="44" height="44" rx="10"/>
        <rect x="440" y="332" width="44" height="44" rx="10"/>
        <rect x="498" y="332" width="44" height="44" rx="10"/>
        <rect x="332" y="440" width="44" height="44" rx="10"/>
        <rect x="390" y="440" width="44" height="44" rx="10"/>
        <rect x="448" y="440" width="44" height="44" rx="10"/>
        <rect x="506" y="440" width="44" height="44" rx="10"/>
        <rect x="564" y="440" width="44" height="44" rx="10"/>
        <rect x="332" y="498" width="44" height="44" rx="10"/>
        <rect x="448" y="498" width="44" height="44" rx="10"/>
        <rect x="564" y="498" width="44" height="44" rx="10"/>
        <rect x="332" y="556" width="44" height="44" rx="10"/>
        <rect x="390" y="556" width="44" height="44" rx="10"/>
        <rect x="506" y="556" width="44" height="44" rx="10"/>
        <rect x="564" y="556" width="44" height="44" rx="10"/>
        <rect x="390" y="614" width="44" height="44" rx="10"/>
        <rect x="448" y="614" width="44" height="44" rx="10"/>
        <rect x="506" y="614" width="44" height="44" rx="10"/>
      </g>
      <text x="450" y="830" text-anchor="middle" fill="#F8FAFC" font-family="Arial, Helvetica, sans-serif" font-size="32">${escapeXml(label)}</text>
    </svg>
  `;

  return svgDataUri(svg);
}

export interface MockAceAssets {
  images: CampaignImageAsset[];
  qrCode: CampaignQrAsset;
  music: CampaignAudioAsset;
  video: CampaignVideoAsset;
}

export function generateMockAceAssets(
  input: CampaignInput,
  prompts: CampaignPrompts
): MockAceAssets {
  const slug = toSlug(input.businessName);
  const posterLabels = ["Offer Focus", "Community Angle", "Minimal Promo"];

  return {
    images: prompts.imagePrompts.map((prompt, index) => ({
      id: `${slug}-poster-${index + 1}`,
      title: `Poster ${index + 1}`,
      prompt,
      imageUrl: posterDataUri(
        input.businessName,
        input.city,
        input.offerDetails,
        posterLabels[index] || `Poster ${index + 1}`,
        index === 0 ? "#7CFFB2" : index === 1 ? "#79D7FF" : "#FFB86B"
      )
    })),
    qrCode: {
      prompt: prompts.qrPrompt,
      imageUrl: qrDataUri(`${input.businessName} • Scan Me`)
    },
    music: {
      title: `${input.businessName} Jingle Preview`,
      prompt: prompts.musicPrompt,
      lyricsIdea: `Hook: ${input.businessName} in ${input.city}, ${input.offerDetails}.`,
      previewImageUrl: previewPanelDataUri("Audio Jingle", "Mock music output", "#FFD166")
    },
    video: {
      title: `${input.businessName} Promo Reel`,
      prompt: prompts.videoPrompt,
      storyboard: [
        `Open with a bold ${input.visualStyle} hero frame`,
        `Show the offer: ${input.offerDetails}`,
        `End on QR scan + click-through to ${input.link}`
      ],
      previewImageUrl: previewPanelDataUri("Promo Video", "Mock video storyboard", "#9B8CFF")
    }
  };
}
