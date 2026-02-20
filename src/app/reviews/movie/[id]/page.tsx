import React from "react";
import Thread from "../../_src/components/Thread";
import { getReviewTitleApi } from "../../_src/api";
import SpinnerProgress from "@/components/custom/SpinnerProgress";

export const generateMetadata = async ({
  params,
}: PageProps<"/reviews/movie/[id]">) => {
  "use cache";
  const { titleId } = await params.then(({ id }) => ({ titleId: id }));

  const { title, year } = await getReviewTitleApi({
    mediaType: "movie",
    titleId,
  });

  return {
    title: `${title} (${year})`,
  };
};

export default async function ReviewPage({
  params,
}: PageProps<"/reviews/movie/[id]">) {
  const _params = params.then(({ id }) => ({ titleId: id }));
  return (
    <>
      <React.Suspense fallback={<SpinnerProgress />}>
        <Thread mediaType="movie" params={_params} />
      </React.Suspense>
    </>
  );
}
