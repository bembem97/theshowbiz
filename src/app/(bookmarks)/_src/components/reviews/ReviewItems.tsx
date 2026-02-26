"use cache";
import { cacheTag } from "next/cache";
import ReviewedTitles from "../ReviewedTitles";
import { ReviewSearchParamProps } from "@/app/(bookmarks)/reviews/page";
import Link from "next/link";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { getReviewsData, UserIdProps } from "../../db/getReviewsData";

export type SavedTitleProps = {
  content: string | null;
  helpful?: boolean | null;
  titleId: number;
  mediaType: "movie" | "tv";
  title: string;
  year: number | null;
  pathname: string | null;
  rating: number | null;
};

const linkClassnames = cva(
  "flex 2xl:justify-start justify-center duration-75 py-3 px-2 hover:bg-foreground/15 transition-colors",
);

export default async function ReviewItems({
  searchParams,
  userId,
}: UserIdProps & { searchParams: ReviewSearchParamProps }) {
  cacheTag("/ratings", "/watched", "/watchlist", "/favorites", "/reviews");
  const reviews = await getReviewsData({ userId });
  const query = await searchParams;

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 2xl:flex 2xl:justify-start 2xl:*:w-max 2xl:*:shrink-0 2xl:*:grow-0">
        <Link
          replace
          className={cn(linkClassnames(), {
            "bg-foreground/5": query.r === undefined || query.r === "comment",
          })}
          href={{ pathname: "/reviews", query: { r: "comment" } }}
        >
          Your Comments
        </Link>
        <Link
          replace
          className={cn(linkClassnames(), {
            "bg-foreground/5": query.r === "helpful",
          })}
          href={{ pathname: "/reviews", query: { r: "helpful" } }}
        >
          Your Reactions
        </Link>
      </div>

      {query.r === undefined || query.r === "comment" ? (
        <ReviewedTitles
          data={reviews?.myReviews}
          emptyMessage="This list is empty."
        />
      ) : query.r === "helpful" ? (
        <ReviewedTitles
          data={reviews?.myReactions}
          emptyMessage="This list is empty."
        />
      ) : (
        <div className="p-2">
          <p>This list is empty.</p>
        </div>
      )}
    </div>
  );
}
