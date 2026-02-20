import { getTitleWatched } from "../../action/call-to-action/read";
import { BookmarkTitleProps } from "../../types/call-to-action";
import WatchedButton from "./WatchedButton";

export default async function WatchedData({
  userId,
  mediaType,
  pathname,
  title,
  titleId,
  year,
}: BookmarkTitleProps) {
  const watched = await getTitleWatched({
    mediaTypeTitleId: `${mediaType}_${titleId}`,
    userId,
  });

  return (
    <>
      <WatchedButton
        mediaType={mediaType.toLowerCase() as "movie" | "tv"}
        mediaTypeTitleId={`${mediaType.toLowerCase()}_${titleId}`}
        title={title}
        titleId={titleId}
        userId={userId}
        pathname={pathname}
        year={year}
        isWatched={
          watched && "isWatched" in watched ? watched.isWatched : false
        }
      />
    </>
  );
}
