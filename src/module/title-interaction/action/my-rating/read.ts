import { cacheLife, cacheTag } from "next/cache";
import prisma, { Prisma } from "@/lib/prisma";
import { getNumberCompact } from "@/lib/utils";
import { DeleteRatingProps, TitleRatingDataProps } from "../../types/my-rating";

type GetRatingProps = Omit<DeleteRatingProps, "id">;

export async function getUserRating({
  mediaType,
  titleId,
  userId,
}: GetRatingProps) {
  "use cache";
  cacheTag(`${mediaType}:${titleId}`);

  try {
    const rating = await prisma.titleInteraction.findFirst({
      where: {
        mediaTypeTitleId: `${mediaType}_${titleId}`,
        userId,
      },
      select: {
        rating: true,
      },
    });

    return rating;
  } catch (error) {
    // Log the error for server-side debugging
    console.error(`Error fetching rating for ${mediaType} ${titleId}:`, error);

    // In a "use cache" function, it's often safest to return null
    // so the UI can gracefully show "no rating" instead of crashing.
    return null;
  }
}

export async function getTitleAverageScore({
  mediaType,
  titleId,
  voteAverage,
}: Omit<TitleRatingDataProps, "voteCount">) {
  "use cache";
  cacheTag(`${mediaType}:${titleId}`);
  cacheLife("weeks");

  try {
    const calcRating = await prisma.titleInteraction.aggregate({
      _avg: { rating: true },
      where: {
        mediaTypeTitleId: `${mediaType}_${titleId}`,
      },
    });

    const VOTE_AVERAGE = Number(voteAverage);

    const dbScoreAvg = calcRating._avg.rating;
    const calcAvg =
      dbScoreAvg && VOTE_AVERAGE
        ? ((VOTE_AVERAGE + dbScoreAvg) / 2).toFixed(1)
        : VOTE_AVERAGE;

    return { success: true, data: calcAvg };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P1017") {
        console.error(
          `Code ${error.code}: `,
          "Server has closed the connection.",
        );
      } else {
        console.error(
          `Code{${error.code}}`,
          `:Name${error.name}`,
          ` => ${error.message}`,
        );
      }
      return {
        success: false,
        code: error.code,
      };
    } else if (error instanceof Error) {
      console.error(`Codename ${error.name}: `, error.message);
      return {
        success: false,
        code: error.name,
      };
    } else {
      console.error("An unexpected error has occured.");
      return {
        success: false,
      };
    }
  }
}

export async function getTotalUserVote({
  mediaType,
  titleId,
  voteCount,
}: Omit<TitleRatingDataProps, "voteAverage">) {
  "use cache";
  cacheTag(`${mediaType}:${titleId}`);
  cacheLife("weeks");

  try {
    const calcRating = await prisma.titleInteraction.aggregate({
      _count: { rating: true },
      where: {
        mediaTypeTitleId: `${mediaType}_${titleId}`,
      },
    });

    const calcCount = voteCount + calcRating._count.rating;

    return { success: true, data: getNumberCompact(calcCount) };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(`Code: ${error.code}`, error.message);
      return {
        success: false,
        code: error.code,
      };
    } else if (error instanceof Error) {
      console.error(`Codename: ${error.name}`, error.message);
      return {
        success: false,
        code: error.name,
      };
    } else {
      console.error("An unexpected error has occured.");
      return {
        success: false,
      };
    }
  }
}
