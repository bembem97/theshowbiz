"use server";

import prisma, { Prisma } from "@/lib/prisma";
import { UpsertRatingProps } from "../../types/my-rating";
import { updateTag } from "next/cache";
import { revalidatePath } from "next/cache";

export async function setRating({
  myRate,
  titleId,
  userId,
  mediaType,
  posterPath,
  title,
  year,
  dbRating,
}: UpsertRatingProps & { dbRating: number | null }) {
  const angSalida = `${mediaType}_${titleId}`;

  if ((myRate === null || myRate === 0) && !Boolean(dbRating)) {
    return { success: false, error: "Rating cannot be null or zero." };
  }

  await prisma.$transaction(
    async (tx) => {
      try {
        const isExistProfile = await tx.profile.findUnique({
          where: {
            userId,
          },
        });

        if (!isExistProfile) {
          return { success: false, error: "No profile" };
        }

        const isActive = await tx.titleInteraction.findUnique({
          where: {
            userId_mediaTypeTitleId: {
              userId,
              mediaTypeTitleId: angSalida,
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
          isRated: isActive?.rating || null,
        };

        if (
          isActive &&
          !interaction.isActiveFavorite &&
          !interaction.isActiveWatched &&
          !interaction.isActiveWatchlist &&
          interaction.isRated
        ) {
          const res = await tx.titleInteraction.delete({
            where: {
              userId_mediaTypeTitleId: {
                userId,
                mediaTypeTitleId: angSalida,
              },
            },
          });

          updateTag(`${mediaType}:${titleId}`);
          revalidatePath("/ratings");

          return res;
        } else {
          const res = await tx.titleInteraction.upsert({
            where: {
              userId_mediaTypeTitleId: {
                userId,
                mediaTypeTitleId: angSalida,
              },
            },
            update: {
              rating: myRate,
            },
            create: {
              rating: myRate,
              mediaTypeTitleId: angSalida,
              mediaType: mediaType.toUpperCase() as "MOVIE" | "TV",
              userId,
              titleId,
              title,
              year: Number(year) || null,
              pathname: posterPath,
              profileId: isExistProfile.id,
            },
            select: {
              rating: true,
            },
          });

          updateTag(`${mediaType}:${titleId}`);
          revalidatePath("/ratings");
          revalidatePath("/favorites");
          revalidatePath("/watched");
          revalidatePath("/watchlist");
          revalidatePath("/reviews");

          return res;
        }
      } catch (error) {
        console.error("Upsert Rating Error:", error);

        //! Check if it's a known Prisma error
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return { success: false, error: `Database error: ${error.code}` };
        }

        return { success: false, error: "An unexpected error occurred." };
      }
    },
    {
      maxWait: 5000, // default is 2 seconds
      timeout: 30000, // default is 5 seconds
    },
  );

  return { success: true };
}
