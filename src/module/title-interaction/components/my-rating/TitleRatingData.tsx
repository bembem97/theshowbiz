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
  const averageScoreAwait = getTitleAverageScore({
    titleId,
    mediaType,
    voteAverage,
  });
  const userCountAwait = getTotalUserVote({
    titleId,
    mediaType,
    voteCount,
  });

  const [averageScore, userCount] = await Promise.all([
    averageScoreAwait,
    userCountAwait,
  ]);

  const avgScr =
    averageScore.success === true && averageScore.data
      ? averageScore.data
      : averageScore.code;
  const totalVote =
    userCount.success === true && userCount.data
      ? userCount.data
      : userCount.code;

  return (
    <div className="flex items-center gap-x-1">
      <MyRating mediaType={mediaType} titleId={titleId} />
      <ScoreBadge value={avgScr} />
      <VoteCountBadge value={totalVote} />
    </div>
  );
}
