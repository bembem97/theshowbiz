"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { BookmarkCheckIcon, BookmarkPlusIcon } from "lucide-react";
import React, { useState, useTransition } from "react";
import { CallToActionProps } from "../../types/call-to-action";
import { isTitleWatchlist } from "../../action/call-to-action/cud";

export default function WatchlistButton({
  mediaType,
  mediaTypeTitleId,
  title,
  titleId,
  userId,
  year,
  pathname,
  isWatchlist,
  ...props
}: Omit<CallToActionProps, "isWatched" | "isFavorite"> &
  React.ComponentProps<typeof Button>) {
  const [isPending, startTransition] = useTransition();
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);

  React.useEffect(() => {
    setIsAddedToWatchlist(isWatchlist);
  }, [isWatchlist, setIsAddedToWatchlist]);

  return (
    <BaseWatchlistButton
      isAddedToWatchlist={isAddedToWatchlist}
      isPending={isPending}
      variant="outline"
      onClick={() =>
        startTransition(async () => {
          await isTitleWatchlist({
            mediaType,
            mediaTypeTitleId,
            title,
            titleId,
            userId,
            year,
            pathname,
          });
        })
      }
      {...props}
    />
  );
}

export function BaseWatchlistButton({
  isAddedToWatchlist,
  isPending,
  ...props
}: { isAddedToWatchlist?: boolean; isPending?: boolean } & React.ComponentProps<
  typeof Button
>) {
  return (
    <Button disabled={isPending} variant="outline" {...props}>
      {isAddedToWatchlist ? (
        <BookmarkCheckIcon className="text-primary" />
      ) : (
        <BookmarkPlusIcon />
      )}
      {isAddedToWatchlist ? "In watchlist" : "Add to Watchlist"}{" "}
      {isPending && <Spinner />}
    </Button>
  );
}
