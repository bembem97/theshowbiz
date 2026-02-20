import prisma from "@/lib/prisma";
import { GetBookmarkTitleProps } from "../../types/call-to-action";
import { cacheTag } from "next/cache";

export async function getTitleFavorite({
  mediaTypeTitleId,
  userId,
}: GetBookmarkTitleProps) {
  "use cache";
  cacheTag(mediaTypeTitleId);

  try {
    const result = await prisma.titleInteraction.findUnique({
      where: {
        userId_mediaTypeTitleId: {
          mediaTypeTitleId,
          userId,
        },
      },
      select: {
        isFavorite: true,
        profileId: true,
      },
    });

    return result;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error("Database error: ", err);
    } else {
      throw new Error("An error has occured.");
    }
  }
}

export async function getTitleWatched({
  mediaTypeTitleId,
  userId,
}: GetBookmarkTitleProps) {
  "use cache";
  cacheTag(mediaTypeTitleId);

  try {
    const result = await prisma.titleInteraction.findUnique({
      where: {
        userId_mediaTypeTitleId: {
          mediaTypeTitleId,
          userId,
        },
      },
      select: {
        isWatched: true,
        profileId: true,
      },
    });

    return result;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error("Database error: ", err);
    } else {
      throw new Error("An error has occured.");
    }
  }
}

export async function getTitleWatchlist({
  mediaTypeTitleId,
  userId,
}: GetBookmarkTitleProps) {
  "use cache";
  cacheTag(mediaTypeTitleId);

  try {
    const result = await prisma.titleInteraction.findUnique({
      where: {
        userId_mediaTypeTitleId: {
          mediaTypeTitleId,
          userId,
        },
      },
      select: {
        isWatchlist: true,
        profileId: true,
      },
    });

    return result;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error("Database error: ", err);
    } else {
      throw new Error("An error has occured.");
    }
  }
}
