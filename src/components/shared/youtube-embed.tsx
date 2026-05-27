"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useCallback, useState } from "react";

type Props = {
  videoId: string;
  title: string;
  showExternalLink?: boolean;
  roundedClassName?: string;
};

function youtubeThumb(videoId: string, quality: "maxres" | "hq") {
  const file = quality === "maxres" ? "maxresdefault" : "hqdefault";
  return `https://i.ytimg.com/vi/${videoId}/${file}.jpg`;
}

function embedSrc(videoId: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    iv_load_policy: "3",
  });
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;
}

export function YoutubeEmbed({
  videoId,
  title,
  showExternalLink = true,
  roundedClassName = "rounded-[1.35rem]",
}: Props) {
  const [playing, setPlaying] = useState(false);
  const [thumbSrc, setThumbSrc] = useState(() => youtubeThumb(videoId, "maxres"));

  const activate = useCallback(() => setPlaying(true), []);
  const frameClass = `${roundedClassName} ring-1 ring-brand-border/60`;

  if (playing) {
    return (
      <div className={`relative aspect-video w-full overflow-hidden bg-brand-ink ${frameClass}`}>
        <iframe
          src={embedSrc(videoId)}
          title={title}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={activate}
        className={`group relative block aspect-video w-full overflow-hidden bg-brand-ink text-left shadow-[var(--shadow-brand-card)] transition duration-300 hover:ring-brand-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent ${frameClass}`}
        aria-label={`Phát video: ${title}`}
      >
        <Image
          src={thumbSrc}
          alt=""
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 1024px) 100vw, 50vw"
          onError={() => setThumbSrc(youtubeThumb(videoId, "hq"))}
        />
        <span
          className="absolute inset-0 bg-gradient-to-t from-brand-ink/75 via-brand-ink/20 to-brand-ink/10 transition duration-300 group-hover:from-brand-ink/80"
          aria-hidden
        />
        <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
          <span className="flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full bg-brand-accent pl-1 shadow-[0_8px_32px_-4px_rgb(240_120_74/0.55)] ring-4 ring-white/30 transition duration-300 group-hover:scale-105 group-hover:bg-brand-accent-light sm:h-[4.75rem] sm:w-[4.75rem]">
            <Play className="h-8 w-8 fill-white text-white sm:h-9 sm:w-9" />
          </span>
        </span>
        <span className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-10 text-left sm:px-5 sm:pb-5">
          <span className="font-heading text-sm font-bold leading-snug text-white sm:text-base">{title}</span>
          <span className="mt-1 block text-xs font-medium text-white/80">Nhấn để phát</span>
        </span>
      </button>
      {showExternalLink ? (
        <p className="mt-3 text-center text-xs text-brand-muted sm:text-sm">
          <a
            href={`https://youtu.be/${videoId}`}
            target="_blank"
            rel="noreferrer"
            className="link-accent font-medium"
          >
            Mở trên YouTube
          </a>
        </p>
      ) : null}
    </div>
  );
}
