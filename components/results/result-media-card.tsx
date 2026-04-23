import Image from "next/image";

interface ResultMediaCardProps {
  title: string;
  description: string;
  imageUrl: string;
  prompt: string;
  mediaUrl?: string;
  mediaType?: "audio" | "video";
}

export function ResultMediaCard({
  title,
  description,
  imageUrl,
  prompt,
  mediaUrl,
  mediaType
}: ResultMediaCardProps) {
  return (
    <article className="media-card report-media-card">
      <div className="media-stack">
        {mediaType === "video" && mediaUrl ? (
          <video
            className="media-preview media-video"
            controls
            playsInline
            preload="metadata"
            poster={imageUrl}
          >
            <source src={mediaUrl} />
          </video>
        ) : (
          <Image
            src={imageUrl}
            alt={title}
            className="media-preview media-preview-contained"
            width={1200}
            height={900}
            unoptimized
          />
        )}
        {mediaType === "audio" && mediaUrl ? (
          <audio className="media-audio" controls preload="metadata" src={mediaUrl} />
        ) : null}
      </div>
      <div className="report-media-copy">
        <strong>{title}</strong>
        <p>{description}</p>
        <small>{prompt}</small>
      </div>
    </article>
  );
}
