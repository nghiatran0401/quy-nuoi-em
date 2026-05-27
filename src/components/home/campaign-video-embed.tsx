"use client";

import { YoutubeEmbed } from "@/components/shared/youtube-embed";

type Props = {
  videoId: string;
  title: string;
};

/** @deprecated Import YoutubeEmbed from @/components/shared/youtube-embed */
export function CampaignVideoEmbed({ videoId, title }: Props) {
  return <YoutubeEmbed videoId={videoId} title={title} />;
}
