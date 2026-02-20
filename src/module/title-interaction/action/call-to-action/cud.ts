"use server";

import prisma from "@/lib/prisma";
import { CallToActionProps } from "../../types/call-to-action";
import { revalidatePath, updateTag } from "next/cache";
import { Prisma } from "@/generated/prisma/client";

export async function isTitleFavorite({
  mediaType,
  mediaTypeTitleId,
  title,
  titleId,
  userId,
  pathname,
  year,
}: Omit<CallToActionProps, "isFavorite" | "isWatched" | "isWatchlist">) {
  try {
    await prisma.$transaction(
      async () => {
        const isActive = await prisma.titleInteraction.findUnique({
          where: {
            userId_mediaTypeTitleId: {
              userId,
              mediaTypeTitleId,
            },
          },
          select: {
            isFavorite: true,
            isWatched: true,
            isWatchlist: true,
            rating: true,
          },
        });

        const interaction = {
          isActiveFavorite: isActive?.isFavorite,
          isActiveWatched: isActive?.isWatched,
          isActiveWatchlist: isActive?.isWatchlist,
          isRated: isActive?.rating || 0,
        };

        if (
          isActive &&
          interaction.isActiveFavorite &&
          !interaction.isActiveWatched &&
          !interaction.isActiveWatchlist &&
          !interaction.isRated
        ) {
          return await prisma.titleInteraction.delete({
            where: {
              userId_mediaTypeTitleId: {
                userId,
                mediaTypeTitleId,
              },
            },
          });
        } else {
          return await prisma.titleInteraction.upsert({
            where: {
              userId_mediaTypeTitleId: {
                userId,
                mediaTypeTitleId,
              },
            },
            update: {
              isFavorite: !interaction.isActiveFavorite,
            },
            create: {
              isFavorite: true,
              mediaTypeTitleId,
              mediaType: mediaType.toUpperCase() as "MOVIE" | "TV",
              userId,
              titleId,
              title,
              year,
              pathname,
            },
            select: {
              isFavorite: true,
            },
          });
        }
      },
      { timeout: 10000 },
    );

    updateTag(mediaTypeTitleId);
    revalidatePath("/favorites");

    return { success: true };
  } catch (error) {
    console.error("Title Favorite Error:", error);

    // Check if it's a known Prisma error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { success: false, error: `Database error: ${error.code}` };
    }

    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function isTitleWatched({
  mediaType,
  mediaTypeTitleId,
  title,
  titleId,
  userId,
  pathname,
  year,
}: Omit<CallToActionProps, "isFavorite" | "isWatched" | "isWatchlist">) {
  try {
    await prisma.$transaction(
      async () => {
        const isActive = await prisma.titleInteraction.findUnique({
          where: {
            userId_mediaTypeTitleId: {
              userId,
              mediaTypeTitleId,
            },
          },
          select: {
            isFavorite: true,
            isWatched: true,
            isWatchlist: true,
            rating: true,
          },
        });

        const interaction = {
          isActiveFavorite: isActive?.isFavorite,
          isActiveWatched: isActive?.isWatched,
          isActiveWatchlist: isActive?.isWatchlist,
          isRated: isActive?.rating || 0,
        };

        if (
          isActive &&
          !interaction.isActiveFavorite &&
          interaction.isActiveWatched &&
          !interaction.isActiveWatchlist &&
          !interaction.isRated
        ) {
          return await prisma.titleInteraction.delete({
            where: {
              userId_mediaTypeTitleId: {
                userId,
                mediaTypeTitleId,
              },
            },
          });
        } else {
          return await prisma.titleInteraction.upsert({
            where: {
              userId_mediaTypeTitleId: {
                userId,
                mediaTypeTitleId,
              },
            },
            update: {
              isWatched: !interaction.isActiveWatched,
            },
            create: {
              isWatched: true,
              mediaTypeTitleId,
              mediaType: mediaType.toUpperCase() as "MOVIE" | "TV",
              userId,
              titleId,
              title,
              year,
              pathname,
            },
            select: {
              isWatched: true,
            },
          });
        }
      },
      { timeout: 10000 },
    );

    updateTag(mediaTypeTitleId);
    revalidatePath("/watched");

    return { success: true };
  } catch (error) {
    console.error("Title Watched Error:", error);

    // Check if it's a known Prisma error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { success: false, error: `Database error: ${error.code}` };
    }

    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function isTitleWatchlist({
  mediaType,
  mediaTypeTitleId,
  title,
  titleId,
  userId,
  pathname,
  year,
}: Omit<CallToActionProps, "isFavorite" | "isWatched" | "isWatchlist">) {
  try {
    await prisma.$transaction(
      async () => {
        const isActive = await prisma.titleInteraction.findUnique({
          where: {
            userId_mediaTypeTitleId: {
              userId,
              mediaTypeTitleId,
            },
          },
          select: {
            isFavorite: true,
            isWatched: true,
            isWatchlist: true,
            rating: true,
          },
        });

        const interaction = {
          isActiveFavorite: isActive?.isFavorite,
          isActiveWatched: isActive?.isWatched,
          isActiveWatchlist: isActive?.isWatchlist,
          isRated: isActive?.rating || 0,
        };

        if (
          isActive &&
          !interaction.isActiveFavorite &&
          !interaction.isActiveWatched &&
          interaction.isActiveWatchlist &&
          !interaction.isRated
        ) {
          return await prisma.titleInteraction.delete({
            where: {
              userId_mediaTypeTitleId: {
                userId,
                mediaTypeTitleId,
              },
            },
          });
        } else {
          return await prisma.titleInteraction.upsert({
            where: {
              userId_mediaTypeTitleId: {
                userId,
                mediaTypeTitleId,
              },
            },
            update: {
              isWatchlist: !interaction.isActiveWatchlist,
            },
            create: {
              isWatchlist: true,
              mediaTypeTitleId,
              mediaType: mediaType.toUpperCase() as "MOVIE" | "TV",
              userId,
              titleId,
              title,
              year,
              pathname,
            },
            select: {
              isWatchlist: true,
            },
          });
        }
      },
      { timeout: 10000 },
    );

    updateTag(mediaTypeTitleId);
    revalidatePath("/watchlist");

    return { success: true };
  } catch (error) {
    console.error("Title Watchlist Error:", error);

    // Check if it's a known Prisma error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { success: false, error: `Database error: ${error.code}` };
    }

    return { success: false, error: "An unexpected error occurred." };
  }
}
