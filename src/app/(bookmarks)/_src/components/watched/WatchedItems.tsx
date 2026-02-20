"use cache";

import prisma from "@/lib/prisma";
import { cacheTag } from "next/cache";
import SavedTitles from "../SavedTitles";

type UserIdProps = { userId: string };

async function getWatchedData({ userId }: UserIdProps) {
  try {
    const res = await prisma.titleInteraction.findMany({
      where: {
        userId,
        isWatched: true,
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
        "Error in 'src/app/(bookmarks)/_src/components/watched/WatchedItems.tsx'",
      );
    } else {
      console.log(error);
      throw new Error(
        "An error has occured in 'src/app/(bookmarks)/_src/components/watched/WatchedItems.tsx'",
      );
    }
  }
}

export default async function WatchedItems({ userId }: UserIdProps) {
  cacheTag("/watched", "/ratings");
  const watched = await getWatchedData({ userId });

  return (
    <div>
      <div className="scanlines border-b bg-slate-300 px-2 py-4 dark:bg-black">
        <h1>Your Watch History</h1>
        <h2 className="text-sm">
          {
            "Everything you've marked as watched, rated, reviewed, or checked into."
          }
        </h2>
      </div>
      <SavedTitles
        data={watched}
        emptyMessage="Looks like you don't have a watch history yet. To get started, mark a title as watched."
      />
    </div>
  );
}
