import MediaBanner from "@/app/(details)/_src/components/medias/MediaBanner";
import BannerFallback from "@/components/custom/BannerFallback";
import React from "react";

export default function ImageItemsLayout({
  children,
  params,
}: LayoutProps<"/tv/[id]/images">) {
  const _params = params.then(({ id }) => ({ titleId: id }));
  return (
    <>
      <React.Suspense fallback={<BannerFallback />}>
        <MediaBanner
        gallery_type="photos"
          params={_params}
          media_type="tv"
          subtext="Image Gallery — Backdrops & Stills"
        />
      </React.Suspense>
      {children}
    </>
  );
}
