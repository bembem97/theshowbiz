import React from "react";
import ReviewBanner from "../../_src/components/ReviewBanner";
import BannerFallback from "@/components/custom/BannerFallback";

export default function ReviewsLayout({
  children,
  params,
}: LayoutProps<"/reviews/movie/[id]">) {
  const _params = params.then((title) => ({ titleId: title.id }));

  return (
    <div className="space-y-2">
      <React.Suspense fallback={<BannerFallback className="h-64" />}>
        <ReviewBanner params={_params} mediaType="movie" />
      </React.Suspense>
      {children}
    </div>
  );
}
