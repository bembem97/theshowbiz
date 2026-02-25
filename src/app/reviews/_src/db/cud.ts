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

  const details = await extFetch<ApiMovieDetailsProps | ApiTvDetailsProps>(
    `${API_URL}${mediaType}/${titleId}?language=en-US&api_key=${API_KEY}`,
  );

  return await prisma.$transaction(
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

        await tx.review.create({
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
                  profileId: isExistProfile.id,
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
        revalidatePath("/reviews");

        return { success: true };
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return { success: false, message: `Database error: ${error.code}` };
        } else if (error instanceof Error) {
          return { success: false, message: `${error.name}: ${error.message}` };
        } else {
          return { success: false, message: "Unexpected Error" };
        }
      }
    },
    {
      maxWait: 5000, // default is 2 seconds
      timeout: 30000, // default is 5 seconds
    },
  );
}

export async function deleteComment({
  commentId,
  mediaType,
  titleId,
}: GetTitleAndTypeProps) {
  return await prisma.$transaction(
    async (tx) => {
      try {
        const review = await tx.review.findUnique({
          where: { id: commentId },
          include: { titleInteraction: true },
        });

        if (!review) return { success: false, message: "" };

        await tx.review.delete({
          where: {
            id: commentId,
          },
        });

        const ti = review.titleInteraction;

        if (!ti) {
          revalidatePath(`/reviews/${mediaType}/${titleId}`);
          revalidatePath("/reviews");
          return { success: true, message: "" };
        }

        const hasOtherFlags =
          ti.isWatchlist || ti.isFavorite || ti.isWatched || ti.rating !== null;

        if (!hasOtherFlags) {
          await tx.titleInteraction.delete({
            where: { id: ti.id },
          });
        }

        revalidatePath(`/reviews/${mediaType}/${titleId}`);
        revalidatePath("/reviews");
        return { success: true, message: "" };
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return { success: false, message: `Database error: ${error.code}` };
        } else if (error instanceof Error) {
          return { success: false, message: `${error.name}: ${error.message}` };
        } else {
          return { success: false, message: "Unexpected Error" };
        }
      }
    },
    {
      maxWait: 5000, // default is 2 seconds
      timeout: 30000, // default is 5 seconds
    },
  );
}

export async function upHelpfulReaction({
  reviewId,
  userId,
}: {
  reviewId: string;
  userId: string | undefined;
}) {
  if (!userId) return;

  return await prisma.$transaction(
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

        const hasReacted = await tx.reaction.findFirst({
          where: {
            reviewId,
            profile: {
              userId,
            },
          },
          select: {
            helpful: true,
            id: true,
            profile: { select: { userId: true } },
          },
        });

        if (
          hasReacted !== null &&
          hasReacted.helpful === true &&
          userId === hasReacted.profile.userId
        ) {
          await tx.reaction.delete({
            where: {
              id: hasReacted.id,
              profile: { userId },
            },
          });
          updateTag(`review:${reviewId}`);
          revalidatePath(`/reviews`);
          return { success: true, message: "" };
        }

        await tx.reaction.upsert({
          where: {
            id: hasReacted?.id || "",
            profile: { userId },
            reviewId,
          },
          update: {
            helpful: true,
          },
          create: {
            helpful: true,
            profileId: isExistProfile.id,
            reviewId,
          },
        });

        updateTag(`review:${reviewId}`);
        revalidatePath(`/reviews`);
        return { success: true, message: "" };
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error(`Code ${error.code}: ${error.message}`);

          return {
            success: false,
            message: `Code ${error.code}`,
          };
        } else if (error instanceof Error) {
          console.error(`Code ${error.name}: ${error.message}`);
          return {
            success: false,
            message: `Code ${error.name}`,
          };
        } else {
          return { success: false, message: "Unexpected Error" };
        }
      }
    },
    {
      maxWait: 5000, // default is 2 seconds
      timeout: 30000, // default is 5 seconds
    },
  );
}

export async function downHelpfulReaction({
  reviewId,
  userId,
}: {
  reviewId: string;
  userId: string | undefined;
}) {
  if (!userId) return;

  return await prisma.$transaction(
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

        const hasReacted = await tx.reaction.findFirst({
          where: {
            reviewId,
            profileId: isExistProfile.id,
          },
          select: {
            helpful: true,
            id: true,
            profile: { select: { userId: true } },
          },
        });

        if (
          hasReacted !== null &&
          hasReacted.helpful === false &&
          userId === hasReacted.profile.userId
        ) {
          await tx.reaction.delete({
            where: {
              id: hasReacted.id,
              profileId: isExistProfile.id,
            },
          });
          updateTag(`review:${reviewId}`);
          revalidatePath("/reviews");
          return { success: true, message: "" };
        }

        await tx.reaction.upsert({
          where: {
            id: hasReacted?.id || "",
            profileId: isExistProfile.id,
            reviewId,
          },
          update: {
            helpful: false,
          },
          create: {
            helpful: false,
            profileId: isExistProfile.id,
            reviewId,
          },
        });

        updateTag(`review:${reviewId}`);
        revalidatePath("/reviews");
        return { success: true, message: "" };
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error(`Code ${error.code}: ${error.message}`);

          return {
            success: false,
            message: `Code ${error.code}`,
          };
        } else if (error instanceof Error) {
          console.error(`Code ${error.name}: ${error.message}`);
          return {
            success: false,
            message: `Code ${error.name}`,
          };
        } else {
          return { success: false, message: "Unexpected Error" };
        }
      }
    },
    {
      maxWait: 5000, // default is 2 seconds
      timeout: 30000, // default is 5 seconds
    },
  );
}
