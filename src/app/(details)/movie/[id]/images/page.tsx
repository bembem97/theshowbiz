import ImageItems from "@/app/(details)/_src/components/medias/ImageItems";
import SpinnerProgress from "@/components/custom/SpinnerProgress";
import React from "react";

export default function ImageItemsPage({
  params,
}: PageProps<"/movie/[id]/images">) {
  const segment = params.then(({ id }) => ({ titleId: id }));
  return (
    <div className="p-2">
      <React.Suspense fallback={<SpinnerProgress />}>
        <ImageItems media_type="movie" params={segment} />
      </React.Suspense>
    </div>
  );
}
