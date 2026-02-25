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
  return await prisma.$transaction(
    async (tx) => {
      try {
        const isExistProfile = await tx.profile.findUnique({
          where: {
            userId,
          },
        });

        if (!isExistProfile) {
          return { success: false, message: "No profile" };
        }

        const isActive = await tx.titleInteraction.findUnique({
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
          await tx.titleInteraction.delete({
            where: {
              userId_mediaTypeTitleId: {
                userId,
                mediaTypeTitleId,
              },
            },
          });
        } else {
          await tx.titleInteraction.upsert({
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
              profileId: isExistProfile.id,
            },
            select: {
              isFavorite: true,
            },
          });
        }

        updateTag(mediaTypeTitleId);
        revalidatePath("/favorites");

        return { success: true, message: "" };
      } catch (error) {
        console.error("Title Favorite Error:", error);

        // Check if it's a known Prisma error
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return { success: false, message: `Database error: ${error.code}` };
        } else if (error instanceof Error) {
          return { success: false, message: `Error: ${error.name}` };
        } else {
          return { success: false, message: "An unexpected error occurred." };
        }
      }
    },
    {
      maxWait: 5000, // default is 2 seconds
      timeout: 30000, // default is 5 seconds
    },
  );
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
  return await prisma.$transaction(
    async (tx) => {
      try {
        const isExistProfile = await tx.profile.findUnique({
          where: {
            userId,
          },
        });

        if (!isExistProfile) {
          return { success: false, message: "No profile" };
        }

        const isActive = await tx.titleInteraction.findUnique({
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
          await tx.titleInteraction.delete({
            where: {
              userId_mediaTypeTitleId: {
                userId,
                mediaTypeTitleId,
              },
            },
          });
        } else {
          await tx.titleInteraction.upsert({
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
              profileId: isExistProfile.id,
            },
            select: {
              isWatched: true,
            },
          });
        }

        updateTag(mediaTypeTitleId);
        revalidatePath("/watched");

        return { success: true, message: "" };
      } catch (error) {
        console.error("Title Watched Error:", error);

        // Check if it's a known Prisma error
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return { success: false, message: `Database error: ${error.code}` };
        } else if (error instanceof Error) {
          return { success: false, message: `Error: ${error.name}` };
        } else {
          return { success: false, message: "An unexpected error occurred." };
        }
      }
    },
    {
      maxWait: 5000, // default is 2 seconds
      timeout: 30000, // default is 5 seconds
    },
  );
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
  return await prisma.$transaction(
    async (tx) => {
      try {
        const isExistProfile = await tx.profile.findUnique({
          where: {
            userId,
          },
        });

        if (!isExistProfile) {
          return { success: false, message: "No profile" };
        }

        const isActive = await tx.titleInteraction.findUnique({
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
          await tx.titleInteraction.delete({
            where: {
              userId_mediaTypeTitleId: {
                userId,
                mediaTypeTitleId,
              },
            },
          });
        } else {
          await tx.titleInteraction.upsert({
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
              profileId: isExistProfile.id,
            },
            select: {
              isWatchlist: true,
            },
          });
        }

        updateTag(mediaTypeTitleId);
        revalidatePath("/watchlist");

        return { success: true, message: "" };
      } catch (error) {
        console.error("Title Watchlist Error:", error);

        // Check if it's a known Prisma error
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return { success: false, message: `Database error: ${error.code}` };
        } else if (error instanceof Error) {
          return { success: false, message: `Error: ${error.name}` };
        } else {
          return { success: false, message: "An unexpected error occurred." };
        }
      }
    },
    {
      maxWait: 5000, // default is 2 seconds
      timeout: 30000, // default is 5 seconds
    },
  );
}
