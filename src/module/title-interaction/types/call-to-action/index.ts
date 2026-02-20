export interface CallToActionProps {
  userId: string;
  mediaTypeTitleId: string;
  titleId: number;
  title: string;
  mediaType: "movie" | "tv";
  year: number | null;
  pathname: string | null;
  isFavorite: boolean;
  isWatched: boolean;
  isWatchlist: boolean;
}

export type GetBookmarkTitleProps = Pick<
  CallToActionProps,
  "mediaTypeTitleId" | "userId"
>;

export type TitleProps = Pick<
  CallToActionProps,
  "mediaType" | "pathname" | "titleId" | "title"
> & { date: string | null };

export type BookmarkTitleProps = Pick<
  CallToActionProps,
  "userId" | "mediaType" | "pathname" | "titleId" | "title" | "year"
>;
