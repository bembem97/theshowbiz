import VideoItems from "@/app/(details)/_src/components/medias/VideoItems";
import SpinnerProgress from "@/components/custom/SpinnerProgress";
import React from "react";

export default function VideoItemsPage({
  params,
}: PageProps<"/movie/[id]/videos">) {
  const segment = params.then(({ id }) => ({ titleId: id }));
  return (
    <div className="p-2">
      <React.Suspense fallback={<SpinnerProgress />}>
        <VideoItems params={segment} media_type="movie" />
      </React.Suspense>
    </div>
  );
}
