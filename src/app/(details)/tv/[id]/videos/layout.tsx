import MediaBanner from "@/app/(details)/_src/components/medias/MediaBanner";
import BannerFallback from "@/components/custom/BannerFallback";
import React from "react";

export default function VideoItemsLayout({
  children,
  params,
}: LayoutProps<"/tv/[id]/videos">) {
  const _params = params.then(({ id }) => ({ titleId: id }));
  return (
    <>
      <React.Suspense fallback={<BannerFallback />}>
        <MediaBanner
        gallery_type="videos"
          params={_params}
          media_type="tv"
          subtext="Video Gallery — Trailers & Clips"
        />
      </React.Suspense>
      {children}
    </>
  );
}
