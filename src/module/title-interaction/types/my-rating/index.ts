import React from "react";

export type BaseTitleInteractionProps = {
  mediaType: "movie" | "tv";
  titleId: number;
  voteAverage: string;
  voteCount: number;
  posterPath: string;
  title: string;
  year: string | null;
  userId: string;
  myRate: null | number;
  mediaTypeTitleId: string;
};

export type TitleRatingValueProps = Omit<
  BaseTitleInteractionProps,
  "voteCount" | "userId" | "myRate" | "mediaTypeTitleId"
>;

export type TitleRatingDataProps = Omit<
  BaseTitleInteractionProps,
  "posterPath" | "title" | "year" | "userId" | "myRate" | "mediaTypeTitleId"
>;

export type MyRatingProps = Pick<
  BaseTitleInteractionProps,
  "mediaType" | "titleId"
>;

export type RatingProps = Pick<
  BaseTitleInteractionProps,
  "mediaType" | "titleId"
>;

export type RatingActionProps = Pick<
  BaseTitleInteractionProps,
  "mediaType" | "titleId" | "myRate"
>;

export type RatedTitleDataProps = Pick<
  BaseTitleInteractionProps,
  "posterPath" | "title" | "year"
>;

export type UpsertRatingProps = Omit<
  BaseTitleInteractionProps,
  "voteCount" | "voteAverage" | "mediaTypeTitleId"
>;

export type DeleteRatingProps = Pick<
  BaseTitleInteractionProps,
  "mediaType" | "titleId" | "userId"
>;

// *
export interface RatingButtonsProps extends Omit<
  React.ComponentProps<"div">,
  "defaultValue"
> {
  setChange: React.Dispatch<React.SetStateAction<null | number>>;
  defaultValue?: null | number;
}

export interface RatingScoreProps extends React.ComponentProps<"div"> {
  score: null | number;
}
