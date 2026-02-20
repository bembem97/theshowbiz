"use cache";

import prisma from "@/lib/prisma";
import { cacheTag } from "next/cache";
import SavedTitles from "../SavedTitles";

type UserIdProps = { userId: string };

async function getFavoriteData({ userId }: UserIdProps) {
  try {
    const res = await prisma.titleInteraction.findMany({
      where: {
        userId,
        isFavorite: true,
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
        "Error in 'src/app/(bookmarks)/_src/components/favorite/FavoriteItems.tsx'",
      );
    } else {
      console.log(error);
      throw new Error(
        "An error has occured in 'src/app/(bookmarks)/_src/components/favorite/FavoriteItems.tsx'",
      );
    }
  }
}

export default async function FavoriteItems({ userId }: UserIdProps) {
  cacheTag("/favorite", "/ratings");
  const favorite = await getFavoriteData({ userId });

  return (
    <div>
      <div className="scanlines border-b bg-slate-300 px-2 py-4 dark:bg-black">
        <h1>Your Favorite</h1>
        <h2 className="text-sm">
          Your favorite movie/show is the place to track the titles you like the
          most
        </h2>
      </div>
      <SavedTitles data={favorite} emptyMessage="This list is empty." />
    </div>
  );
}
