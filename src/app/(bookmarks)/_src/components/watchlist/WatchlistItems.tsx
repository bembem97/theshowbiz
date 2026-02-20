"use cache";

import prisma from "@/lib/prisma";
import { cacheTag } from "next/cache";
import SavedTitles from "../SavedTitles";

type UserIdProps = { userId: string };

async function getWatchlistData({ userId }: UserIdProps) {
  try {
    const res = await prisma.titleInteraction.findMany({
      where: {
        userId,
        isWatchlist: true,
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
        "Error in 'src/app/(bookmarks)/_src/components/watchlist/WatchlistItems.tsx'",
      );
    } else {
      console.log(error);
      throw new Error(
        "An error has occured in 'src/app/(bookmarks)/_src/components/watchlist/WatchlistItems.tsx'",
      );
    }
  }
}

export default async function WatchlistItems({ userId }: UserIdProps) {
  cacheTag("/watchlist", "/ratings");
  const watchlist = await getWatchlistData({ userId });

  return (
    <div>
      <div className="scanlines border-b bg-slate-300 px-2 py-4 dark:bg-black">
        <h1>Your Watchlist</h1>
        <h2 className="text-sm">
          Your Watchlist is the place to track the titles you want to watch.
        </h2>
      </div>
      <SavedTitles data={watchlist} emptyMessage="This list is empty." />
    </div>
  );
}
