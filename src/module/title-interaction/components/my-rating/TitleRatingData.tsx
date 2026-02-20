import MyRating from ".";
import { ScoreBadge, VoteCountBadge } from "@/components/custom/Badge";
import {
  getTitleAverageScore,
  getTotalUserVote,
} from "../../action/my-rating/read";
import { TitleRatingDataProps } from "../../types/my-rating";

export default async function TitleRatingData({
  mediaType,
  titleId,
  voteAverage,
  voteCount,
}: TitleRatingDataProps) {
  const averageScore = await getTitleAverageScore({
    titleId,
    mediaType,
    voteAverage,
  });
  const userCount = await getTotalUserVote({
    titleId,
    mediaType,
    voteCount,
  });

  return (
    <div className="flex items-center gap-x-1">
      <MyRating mediaType={mediaType} titleId={titleId} />
      <ScoreBadge value={averageScore} />
      <VoteCountBadge value={userCount} />
    </div>
  );
}
