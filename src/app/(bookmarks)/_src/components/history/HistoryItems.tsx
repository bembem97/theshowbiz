"use cache";

import prisma from "@/lib/prisma";
import { cacheTag } from "next/cache";
import SavedTitles from "../SavedTitles";

type UserIdProps = { userId: string };

async function getHistoryData({ userId }: UserIdProps) {
  try {
    const res = await prisma.review.findMany({
      where: {
        OR: [
          { content: { not: null }, profile: { userId } },
          { reaction: { every: { helpful: true, userId } } },
          { reaction: { every: { helpful: false, userId } } },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        mediaType: true,
        titleId: true,
        content: true,
        titleInteraction: {
          select: {
            pathname: true,
            rating: true,
            title: true,
            year: true,
          },
        },
      },
    });

    const data = res.map(
      ({ mediaType, titleId, content, titleInteraction }) => {
        if (!titleInteraction)
          return {
            mediaType,
            titleId,
            pathname: "",
            rating: 0,
            title: "",
            year: 0,
            content: "",
          };

        const { pathname, rating, title, year } = titleInteraction;

        return { content, mediaType, titleId, pathname, rating, title, year };
      },
    );

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.name, error.message);
      throw new Error(
        "Error in 'src/app/(bookmarks)/_src/components/history/HistoryItems.tsx'",
      );
    } else {
      console.log(error);
      throw new Error(
        "An error has occured in 'src/app/(bookmarks)/_src/components/history/HistoryItems.tsx'",
      );
    }
  }
}

export default async function HistoryItems({ userId }: UserIdProps) {
  cacheTag("/history", "/ratings");
  const history = await getHistoryData({ userId });

  return (
    <>
      <SavedTitles data={history} emptyMessage="This list is empty." />
    </>
  );
}
