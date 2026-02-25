import prisma from "@/lib/prisma";
import { GetTitleAndTypeProps } from "../types";
import { getNumberCompact } from "@/lib/utils";
import { cacheLife, cacheTag } from "next/cache";

export async function getReviews({
  mediaType,
  titleId,
}: Omit<GetTitleAndTypeProps, "commentId">) {
  const MEDIA_TYPE = mediaType.toUpperCase() as "MOVIE" | "TV";
  try {
    const result = await prisma.review.findMany({
      where: {
        titleId,
        mediaType: MEDIA_TYPE,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        content: true,
        createdAt: true,
        id: true,
        profile: {
          select: {
            username: true,
            userId: true,
          },
        },
        reaction: {
          select: {
            helpful: true,
            profileId: true,
            profile: { select: { userId: true } },
          },
        },
      },
    });

    const data = result.map(
      ({ content, createdAt, id, profile, reaction }) => ({
        content,
        createdAt,
        id,
        username: profile.username,
        dbUserId: profile.userId,
        reaction,
      }),
    );

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`An error has occured in getReviews(): ${error.message}`);
    } else {
      throw new Error("An error has occured.");
    }
  }
}

export async function getPositiveReactions({ reviewId }: { reviewId: string }) {
  "use cache";
  cacheTag(`review:${reviewId}`);
  cacheLife("hours");
  try {
    const result = await prisma.reaction.count({
      where: {
        reviewId,
        helpful: true,
      },
    });

    return { count: getNumberCompact(result) };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `An error has occured in getPositiveReactions(): ${error.message}`,
      );
    } else {
      throw new Error("An error has occured.");
    }
  }
}

export async function getNegativeReactions({ reviewId }: { reviewId: string }) {
  "use cache";
  cacheTag(`review:${reviewId}`);
  cacheLife("hours");
  try {
    const result = await prisma.reaction.count({
      where: {
        reviewId,
        helpful: false,
      },
    });

    return { count: getNumberCompact(result) };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `An error has occured in getNegativeReactions(): ${error.message}`,
      );
    } else {
      throw new Error("An error has occured.");
    }
  }
}

export async function getMyReaction({
  reviewId,
  userId,
  isHelpful,
}: {
  reviewId: string;
  userId: string | undefined;
  isHelpful: boolean;
}) {
  "use cache";
  cacheTag(`review:${reviewId}`);
  try {
    const myReaction = await prisma.reaction.findFirst({
      where: {
        profile: { userId },
        reviewId,
        helpful: isHelpful,
      },
      select: {
        helpful: true,
      },
    });

    return myReaction?.helpful;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `An error has occured in getNegativeReactions(): ${error.message}`,
      );
    } else {
      throw new Error("An error has occured.");
    }
  }
}
