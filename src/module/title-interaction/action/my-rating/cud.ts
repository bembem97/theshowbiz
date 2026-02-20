"use server";

import prisma from "@/lib/prisma";
import { UpsertRatingProps } from "../../types/my-rating";
import { updateTag } from "next/cache";
// import { Prisma } from "@/generated/prisma/client";
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

  try {
    await prisma.$transaction(
      async () => {
        const isActive = await prisma.titleInteraction.findUnique({
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
          const res = await prisma.titleInteraction.delete({
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
          const res = await prisma.titleInteraction.upsert({
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

          return res;
        }
      },
      { timeout: 10_000 },
    );

    return { success: true };
  } catch (error) {
    console.error("Upsert Rating Error:", error);

    // Check if it's a known Prisma error
    // if (error instanceof Prisma.PrismaClientKnownRequestError) {
    //   return { success: false, error: `Database error: ${error.code}` };
    // }

    return { success: false, error: "An unexpected error occurred." };
  }
}

// export async function upsertRating({
//   myRate,
//   titleId,
//   userId,
//   mediaType,
//   posterPath,
//   title,
//   year,
// }: UpsertRatingProps) {
//   const MEDIA_TYPE = mediaType.toUpperCase() as "MOVIE" | "TV";
//   const pk = `${mediaType}_${titleId}`;

//   try {
//     const fields = {
//       mediaTypeTitleId: pk,
//       rating: myRate,
//       mediaType: MEDIA_TYPE,
//       userId,
//       titleId,
//       title,
//       pathname: posterPath,
//       year: Number(year) || null,
//     };

//     const data = await prisma.titleInteraction.upsert({
//       where: {
//         userId_mediaTypeTitleId: { mediaTypeTitleId: pk, userId },
//       },
//       update: {
//         rating: myRate,
//       },
//       create: fields,
//     });

//     // Refresh the page data without a full reload
//     updateTag(`${mediaType}:${titleId}`);

//     return { success: true, data };
//   } catch (error) {
//     console.error("Upsert Rating Error:", error);

//     // Check if it's a known Prisma error
//     if (error instanceof Prisma.PrismaClientKnownRequestError) {
//       return { success: false, error: `Database error: ${error.code}` };
//     }

//     return { success: false, error: "An unexpected error occurred." };
//   }
// }

// export async function deleteRating({
//   mediaType,
//   userId,
//   titleId,
// }: DeleteRatingProps) {
//   try {
//     const data = await prisma.titleInteraction.delete({
//       where: {
//         userId_mediaTypeTitleId: {
//           mediaTypeTitleId: `${mediaType}_${titleId}`,
//           userId,
//         },
//       },
//     });

//     // Refresh the page data without a full reload
//     updateTag(`${mediaType}:${titleId}`);

//     return { success: true, data };
//   } catch (error) {
//     console.error("Delete Rating Error:", error);

//     // Specifically handle the case where the record doesn't exist
//     if (error instanceof Prisma.PrismaClientKnownRequestError) {
//       if (error.code === "P2025") {
//         return {
//           success: false,
//           error: "Rating not found. It may have already been deleted.",
//         };
//       }
//     }

//     return { success: false, error: "Failed to delete the rating." };
//   }
// }
