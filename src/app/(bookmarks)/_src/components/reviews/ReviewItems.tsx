"use cache";
import prisma from "@/lib/prisma";
import { cacheTag } from "next/cache";
import SavedTitles from "../SavedTitles";
import ReviewedTitles, { ReviewedTitlesDataProps } from "../ReviewedTitles";

type UserIdProps = { userId: string };

async function getReviewsData({ userId }: UserIdProps) {
  try {
    const user = await prisma.profile.findUnique({
      where: { id: userId },
      omit: {
        id: true,
        userId: true,
        username: true,
      },
      include: {
        reaction: {
          orderBy: {
            createdAt: "desc",
          },
          select: {
            helpful: true,
            id: true,
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
        review: {
          select: {
            id: true,
            content: true,
            titleInteraction: {
              select: {
                id: true,
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
      // const res = await prisma.review.findMany({
      //   where: {
      //     OR: [
      //       { content: { not: null }, profile: { userId } },
      //       { reaction: { some: { helpful: true, userId } } },
      //       { reaction: { some: { helpful: false, userId } } },
      //     ],
      //   },
      //   orderBy: {
      //     createdAt: "desc",
      //   },
      //   select: {
      //     mediaType: true,
      //     titleId: true,
      //     content: true,
      //     titleInteraction: {
      //       select: {
      //         pathname: true,
      //         rating: true,
      //         title: true,
      //         year: true,
      //       },
      //     },
      //   },
      // });

      // select: {
      //   profile: {
      //     select: {
      //       review: {
      //         select: {
      //           id: true,
      //           content: true,
      //           titleInteraction: {
      //             select: {
      //               id: true,
      //               rating: true,
      //               mediaType: true,
      //               pathname: true,
      //               title: true,
      //               titleId: true,
      //               year: true,
      //             },
      //           },
      //         },
      //       },
      //     },
      //   },
      //   reaction: {
      //     select: {
      //       helpful: true,
      //       id: true,
      //       review: {
      //         select: {
      //           titleInteraction: {
      //             select: {
      //               rating: true,
      //               mediaType: true,
      //               pathname: true,
      //               title: true,
      //               titleId: true,
      //               year: true,
      //             },
      //           },
      //         },
      //       },
      //     },
      //   },
      // },
    });

    if (!user) return;
    console.log(user);

    const { review, reaction } = user;

    // console.log("Reaction: ", reaction);

    // const data = res.map(
    //   ({ mediaType, titleId, content, titleInteraction }) => {
    //     if (!titleInteraction)
    //       return {
    //         mediaType,
    //         titleId,
    //         pathname: "",
    //         rating: 0,
    //         title: "",
    //         year: 0,
    //         content: "",
    //       };

    //     const { pathname, rating, title, year } = titleInteraction;

    //     return { content, mediaType, titleId, pathname, rating, title, year };
    //   },
    // );

    // return data;
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

export default async function ReviewItems({ userId }: UserIdProps) {
  cacheTag("/ratings", "/watched", "/watchlist", "/favorites", "/reviews");
  const reviews = await getReviewsData({ userId });

  return (
    <>
      {/* <ReviewedTitles data={reviews} emptyMessage="This list is empty." /> */}
    </>
  );
}
