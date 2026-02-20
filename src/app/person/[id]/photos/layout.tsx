import React from "react";
import StarBanner from "../../_src/components/media/StarBanner";
import BannerFallback from "@/components/custom/BannerFallback";

export default function ImageItemsLayout({
  children,
  params,
}: LayoutProps<"/person/[id]/photos">) {
  const _params = params.then(({ id }) => ({ starId: id }));
  return (
    <>
      <React.Suspense fallback={<BannerFallback />}>
        <StarBanner params={_params} />
      </React.Suspense>
      {children}
    </>
  );
}
