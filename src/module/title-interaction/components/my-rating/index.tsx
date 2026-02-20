import { AuthProps } from "@/types/_other/session";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { AuthSessionProvider } from "../../context/AuthSession";
import { getUserRating } from "../../action/my-rating/read";
import { RatingDialog } from "./components";
import Rating from "./rating";
import { MyRatingProps } from "../../types/my-rating";

export default async function MyRating({ mediaType, titleId }: MyRatingProps) {
  const apiSession: AuthProps | null = await auth.api.getSession({
    headers: await headers(),
  });

  if (!apiSession) {
    return (
      <RatingDialog label="Rate Now">
        <Rating mediaType={mediaType} titleId={titleId} />
      </RatingDialog>
    );
  }

  const { session } = apiSession;

  const title = await getUserRating({
    mediaType,
    titleId,
    userId: session.userId,
  });

  const isRated =
    title !== null &&
    "rating" in title &&
    title.rating !== null &&
    title.rating;

  const label = !isRated ? "Rate Now" : `Your score: ${isRated || 0}`;

  return (
    <AuthSessionProvider session={apiSession}>
      <RatingDialog label={label}>
        <Rating
          mediaType={mediaType}
          titleId={titleId}
          defaultValue={!isRated ? 0 : isRated}
        />
      </RatingDialog>
    </AuthSessionProvider>
  );
}
