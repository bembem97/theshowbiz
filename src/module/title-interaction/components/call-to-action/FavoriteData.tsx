import { getTitleFavorite } from "../../action/call-to-action/read";
import { BookmarkTitleProps } from "../../types/call-to-action";
import FavoriteButton from "./FavoriteButton";

export default async function FavoriteData({
  userId,
  mediaType,
  pathname,
  title,
  titleId,
  year,
}: BookmarkTitleProps) {
  const favorite = await getTitleFavorite({
    mediaTypeTitleId: `${mediaType}_${titleId}`,
    userId,
  });

  return (
    <>
      <FavoriteButton
        mediaType={mediaType.toLowerCase() as "movie" | "tv"}
        mediaTypeTitleId={`${mediaType.toLowerCase()}_${titleId}`}
        title={title}
        titleId={titleId}
        userId={userId}
        pathname={pathname}
        year={year}
        isFavorite={
          favorite && "isFavorite" in favorite ? favorite.isFavorite : false
        }
      />
    </>
  );
}
