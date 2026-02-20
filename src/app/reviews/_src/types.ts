import { AuthProps } from "@/types/_other/session";

export type CreateCommentInputProps = {
  content: string;
  mediaType: "movie" | "tv";
  titleId: number;
  cookies: AuthProps | null;
};

export type GetReviewTitleProps = Omit<CreateCommentInputProps, "content">;

export type GetTitleAndTypeProps = { commentId: string } & Pick<
  CreateCommentInputProps,
  "mediaType" | "titleId"
>;
