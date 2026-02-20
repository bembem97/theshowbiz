import { Spinner } from "@/components/ui/spinner";
import React from "react";
import TitleRatingData from "./TitleRatingData";
import { RatedTitleDataProvider } from "../../context/RatedTitleData";
import { BaseTitleInteractionProps } from "../../types/my-rating";

export default function TitleRating({
  mediaType,
  titleId,
  voteAverage,
  voteCount,
  posterPath,
  title,
  year,
}: Omit<BaseTitleInteractionProps, "userId" | "myRate" | "mediaTypeTitleId">) {
  return (
    <React.Suspense fallback={<Spinner />}>
      <RatedTitleDataProvider titleData={{ posterPath, title, year }}>
        <TitleRatingData
          mediaType={mediaType}
          titleId={titleId}
          voteAverage={voteAverage}
          voteCount={voteCount}
        />
      </RatedTitleDataProvider>
    </React.Suspense>
  );
}
