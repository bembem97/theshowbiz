"use server";

import { MediaType } from "@/generated/prisma/enums";
import prisma, { Prisma } from "@/lib/prisma";
import { CreateCommentInputProps, GetTitleAndTypeProps } from "../types";
import { revalidatePath, updateTag } from "next/cache";
import { extFetch } from "@/lib/fetch";
import {
  ApiMovieDetailsProps,
  ApiTvDetailsProps,
} from "@/app/(details)/_src/type/main-types";
import { API_KEY, API_URL } from "@/lib/constant";
import { getImagePathname, getPrettyDate } from "@/lib/utils";

export async function createComment({
  content,
  mediaType,
  cookies,
  titleId,
}: CreateCommentInputProps) {
  const MEDIA_TYPE = mediaType.toUpperCase() as MediaType;
  let userId = "";

  if (cookies) {
    userId = cookies.session.userId;
  }

  try {
    const details = await extFetch<ApiMovieDetailsProps | ApiTvDetailsProps>(
      `${API_URL}${mediaType}/${titleId}?language=en-US&api_key=${API_KEY}`,
    );

    await prisma.review.create({
      data: {
        mediaType: MEDIA_TYPE,
        content,
        titleId,
        profile: {
          connect: {
            userId,
          },
        },
        titleInteraction: {
          connectOrCreate: {
            create: {
              mediaType: MEDIA_TYPE,
              mediaTypeTitleId: `${mediaType}_${titleId}`,
              title: "name" in details ? details.name : details.title,
              titleId,
              pathname: getImagePathname(details.poster_path),
              year: Number(
                getPrettyDate({
                  date:
                    "first_air_date" in details
                      ? details.first_air_date
                      : details.release_date,
                  style: "year",
                }),
              ),
              userId,
            },
            where: {
              userId_mediaTypeTitleId: {
                userId,
                mediaTypeTitleId: `${mediaType}_${titleId}`,
              },
            },
          },
        },
      },
    });

    revalidatePath(`/reviews/${mediaType}/${titleId}`);

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: `${error.name}: ${error.message}` };
    } else {
      return { success: false, message: "Unexpected Error" };
    }
  }
}

export async function deleteComment({
  commentId,
  mediaType,
  titleId,
}: GetTitleAndTypeProps) {

  try {
    await prisma.$transaction(async (tx) => {
      try {
        const review = await tx.review.findUnique({
          where: { id: commentId },
          include: { titleInteraction: true },
        });

        if (!review) return;

        await tx.review.delete({
          where: {
            id: commentId,
          },
        });

        const ti = review.titleInteraction;
        if (!ti) {
          revalidatePath(`/reviews/${mediaType}/${titleId}`);
          return;
        }

        const hasOtherFlags =
          ti.isWatchlist || ti.isFavorite || ti.isWatched || ti.rating !== null;

        if (!hasOtherFlags) {
          await tx.titleInteraction.delete({
            where: { id: ti.id },
          });
        }

        revalidatePath(`/reviews/${mediaType}/${titleId}`);

        return { success: true };
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return { success: false, error: `Database error: ${error.code}` };
        } else if (error instanceof Error) {
          return { success: false, message: `${error.name}: ${error.message}` };
        } else {
          return { success: false, message: "Unexpected Error" };
        }
      }
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: `${error.name}: ${error.message}` };
    } else {
      return { success: false, message: "Unexpected Error" };
    }
  }
}

export async function upHelpfulReaction({
  reviewId,
  userId,
}: {
  reviewId: string;
  userId: string | undefined;
}) {
  if (!userId) return;

  try {
    await prisma.$transaction(async () => {
      const hasReacted = await prisma.reaction.findFirst({
        where: {
          reviewId,
          userId,
        },
        select: {
          helpful: true,
          id: true,
          userId: true,
        },
      });

      if (
        hasReacted !== null &&
        hasReacted.helpful === true &&
        userId === hasReacted.userId
      ) {
        await prisma.reaction.delete({
          where: {
            id: hasReacted.id,
            userId,
          },
        });
        updateTag(`review:${reviewId}`);
        return;
      }

      await prisma.reaction.upsert({
        where: {
          id: hasReacted?.id || "",
          userId,
          reviewId,
        },
        update: {
          helpful: true,
        },
        create: {
          helpful: true,
          userId,
          reviewId,
        },
      });
      updateTag(`review:${reviewId}`);
      return;
    });
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: `${error.name}: ${error.message}` };
    } else {
      return { success: false, message: "Unexpected Error" };
    }
  }
}
export async function downHelpfulReaction({
  reviewId,
  userId,
}: {
  reviewId: string;
  userId: string | undefined;
}) {
  if (!userId) return;

  try {
    await prisma.$transaction(async () => {
      const hasReacted = await prisma.reaction.findFirst({
        where: {
          reviewId,
          userId,
        },
        select: {
          helpful: true,
          id: true,
          userId: true,
        },
      });

      if (
        hasReacted !== null &&
        hasReacted.helpful === false &&
        userId === hasReacted.userId
      ) {
        await prisma.reaction.delete({
          where: {
            id: hasReacted.id,
            userId,
          },
        });
        updateTag(`review:${reviewId}`);
        return;
      }

      await prisma.reaction.upsert({
        where: {
          id: hasReacted?.id || "",
          userId,
          reviewId,
        },
        update: {
          helpful: false,
        },
        create: {
          helpful: false,
          userId,
          reviewId,
        },
      });
      updateTag(`review:${reviewId}`);
      return;
    });
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: `${error.name}: ${error.message}` };
    } else {
      return { success: false, message: "Unexpected Error" };
    }
  }
}
