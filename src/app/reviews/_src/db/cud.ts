"use server";

import { MediaType } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { CreateCommentInputProps, GetTitleAndTypeProps } from "../types";
import { revalidatePath, updateTag } from "next/cache";

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
    await prisma.review.delete({
      where: {
        id: commentId,
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
