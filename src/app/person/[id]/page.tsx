import React from "react";
import CelebrityDetails from "../_src/components/CelebrityDetails";
import SpinnerProgress from "@/components/custom/SpinnerProgress";

export default function CelebrityPage({ params }: PageProps<"/person/[id]">) {
  const _params = params.then((p) => ({ starId: p.id }));
  return (
    <div className="@container/star space-y-4">
      <React.Suspense fallback={<SpinnerProgress />}>
        <CelebrityDetails params={_params} />
      </React.Suspense>
    </div>
  );
}
