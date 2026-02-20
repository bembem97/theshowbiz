import SpinnerProgress from "@/components/custom/SpinnerProgress";
import React from "react";
import Photos from "../../_src/components/media/Photos";

export default function StarPhotosPage({
  params,
}: PageProps<"/person/[id]/photos">) {
  const _params = params.then(({ id }) => ({ starId: id }));

  return (
    <div className="@container/profile p-2">
      <React.Suspense fallback={<SpinnerProgress />}>
        <Photos params={_params} />
      </React.Suspense>
    </div>
  );
}
