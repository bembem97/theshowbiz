import { getTitleWatchlist } from "../../action/call-to-action/read";
import { BookmarkTitleProps } from "../../types/call-to-action";
import WatchlistButton from "./WatchlistButton";

export default async function WatchlistData({
  userId,
  mediaType,
  pathname,
  title,
  titleId,
  year,
}: BookmarkTitleProps) {
  const favorite = await getTitleWatchlist({
    mediaTypeTitleId: `${mediaType}_${titleId}`,
    userId,
  });

  return (
    <>
      <WatchlistButton
        mediaType={mediaType.toLowerCase() as "movie" | "tv"}
        mediaTypeTitleId={`${mediaType.toLowerCase()}_${titleId}`}
        title={title}
        titleId={titleId}
        userId={userId}
        pathname={pathname}
        year={year}
        isWatchlist={
          favorite && "isWatchlist" in favorite ? favorite.isWatchlist : false
        }
      />
    </>
  );
}
