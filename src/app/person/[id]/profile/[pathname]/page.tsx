import ViewProfile from "@/app/person/_src/components/media/ViewProfile";
import { ButtonBack } from "@/components/custom/Button";
import SpinnerProgress from "@/components/custom/SpinnerProgress";
import React from "react";

export default function StarProfilePage({
  params,
}: PageProps<"/person/[id]/profile/[pathname]">) {
  const _params = params.then((q) => ({ pathname: q.pathname }))

  return (
    <div className="flex h-full flex-col">
      <ButtonBack
        variant="ghost"
        className="mr-auto h-auto w-max shrink-0 grow-0 rounded-none border-none py-3"
      />

      <div className="relative shrink grow basis-full overflow-clip">
          <React.Suspense fallback={<SpinnerProgress />}>
            <ViewProfile params={_params} />
          </React.Suspense>
      </div>
    </div>
  );
}
