import prisma from "@/lib/prisma";
import { SavedTitleProps } from "../components/reviews/ReviewItems";

export type UserIdProps = { userId: string };

export async function getReviewsData({ userId }: UserIdProps) {
  try {
    const user = await prisma.profile.findUnique({
      where: { userId },
      omit: {
        id: true,
        userId: true,
        username: true,
      },
      include: {
        // * Get the titles that the user reacted to.
        reaction: {
          orderBy: {
            createdAt: "desc",
          },
          select: {
            helpful: true,
            review: {
              select: {
                content: true,
                titleInteraction: {
                  select: {
                    rating: true,
                    mediaType: true,
                    pathname: true,
                    title: true,
                    titleId: true,
                    year: true,
                  },
                },
              },
            },
          },
        },
        // * Get the titles left with review
        review: {
          orderBy: {
            createdAt: "desc",
          },
          select: {
            content: true,
            titleInteraction: {
              select: {
                rating: true,
                mediaType: true,
                pathname: true,
                title: true,
                titleId: true,
                year: true,
              },
            },
          },
        },
      },
    });

    if (!user) return;

    const { review, reaction } = user;

    const myReviews = review.map(({ content, titleInteraction: ti }) => {
      if (ti) {
        const { mediaType, pathname, rating, title, titleId, year } = ti;
        const MEDIA_TYPE = mediaType.toLowerCase() as "movie" | "tv";

        const res: Omit<SavedTitleProps, "helpful"> = {
          content,
          mediaType: MEDIA_TYPE,
          pathname,
          rating,
          title,
          titleId,
          year,
        };

        return res;
      }

      return null;
    });

    const myReactions = reaction.map(
      ({ helpful, review: { content, titleInteraction: ti } }) => {
        if (ti) {
          const { mediaType, pathname, rating, title, titleId, year } = ti;
          const MEDIA_TYPE = mediaType.toLowerCase() as "movie" | "tv";

          const res: SavedTitleProps = {
            content,
            helpful,
            mediaType: MEDIA_TYPE,
            pathname,
            rating,
            title,
            titleId,
            year,
          };
          return res;
        }

        return null;
      },
    );

    return {
      myReactions,
      myReviews,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.name, error.message);
      throw new Error(
        "Error in 'src/app/(bookmarks)/_src/components/reviews/ReviewItems.tsx'",
      );
    } else {
      console.error(error);
      throw new Error(
        "An error has occured in 'src/app/(bookmarks)/_src/components/reviews/ReviewItems.tsx'",
      );
    }
  }
}
