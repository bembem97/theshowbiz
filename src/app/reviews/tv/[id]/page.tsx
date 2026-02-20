import React from "react";
import Thread from "../../_src/components/Thread";
import { getReviewTitleApi } from "../../_src/api";
import SpinnerProgress from "@/components/custom/SpinnerProgress";

export const generateMetadata = async ({
  params,
}: PageProps<"/reviews/tv/[id]">) => {
  "use cache";
  const { titleId } = await params.then((title) => ({ titleId: title.id }));

  const { title, year } = await getReviewTitleApi({ mediaType: "tv", titleId });

  return {
    title: `${title} (${year})`,
  };
};

export default function ReviewPage({ params }: PageProps<"/reviews/tv/[id]">) {
  const _params = params.then((title) => ({ titleId: title.id }));

  return (
    <>
      <React.Suspense fallback={<SpinnerProgress />}>
        <Thread mediaType="tv" params={_params} />
      </React.Suspense>
    </>
  );
}
