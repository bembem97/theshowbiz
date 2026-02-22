import { ScoreBadge } from "@/components/custom/Badge";
import { Spinner } from "@/components/ui/spinner";
import React from "react";
import { getTitleAverageScore } from "../title-interaction/action/my-rating/read";

export default function DynamicScore({
  mediaType,
  titleId,
  voteAverage,
}: {
  mediaType: "movie" | "tv";
  titleId: number;
  voteAverage: string | number | null;
}) {
  return (
    <React.Suspense fallback={<Spinner />}>
      <Score
        mediaType={mediaType}
        titleId={titleId}
        voteAverage={voteAverage}
      />
    </React.Suspense>
  );
}

async function Score({
  mediaType,
  titleId,
  voteAverage,
}: {
  mediaType: "movie" | "tv";
  titleId: number;
  voteAverage: string | number | null;
}) {
  const result = await getTitleAverageScore({
    titleId,
    mediaType,
    voteAverage: voteAverage?.toString() || "n/a",
  });

  const data =
    result.success === true && result.data ? result.data : result.code;

  return <ScoreBadge value={data} />;
}
