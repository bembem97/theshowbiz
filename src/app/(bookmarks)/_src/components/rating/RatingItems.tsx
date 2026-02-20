"use cache";

import prisma from "@/lib/prisma";
import { cacheTag } from "next/cache";
import SavedTitles from "../SavedTitles";

type UserIdProps = { userId: string };

async function getRatingsData({ userId }: UserIdProps) {
  try {
    const res = await prisma.titleInteraction.findMany({
      where: {
        userId,
        rating: { not: null },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        mediaType: true,
        pathname: true,
        rating: true,
        title: true,
        titleId: true,
        year: true,
      },
    });
    return res;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.name, error.message);
      throw new Error(
        "Error in 'src/app/(bookmarks)/_src/components/rating/RatingItems.tsx'",
      );
    } else {
      console.log(error);
      throw new Error(
        "An error has occured in 'src/app/(bookmarks)/_src/components/rating/RatingItems.tsx'",
      );
    }
  }
}

export default async function RatingItems({ userId }: UserIdProps) {
  cacheTag("/ratings", "/watched", "/watchlist", "/favorites");

  const ratingItems = await getRatingsData({ userId });

  return (
    <div>
      <div className="scanlines border-b bg-slate-300 px-2 py-4 dark:bg-black">
        <h1>Your Ratings</h1>
        <h2 className="text-sm">
          This page compiles a list of titles you have rated, providing a
          convenient overview of all your ratings.
        </h2>
      </div>
      <SavedTitles
        emptyMessage="You haven't rated anything yet. Start rating titles and they will be listed here."
        data={ratingItems}
      />
    </div>
  );
}
