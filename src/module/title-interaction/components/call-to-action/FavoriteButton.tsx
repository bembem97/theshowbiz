"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { HeartIcon, HeartPlusIcon } from "lucide-react";
import React, { useState, useTransition } from "react";
import { CallToActionProps } from "../../types/call-to-action";
import { isTitleFavorite } from "../../action/call-to-action/cud";

export default function FavoriteButton({
  mediaType,
  mediaTypeTitleId,
  title,
  titleId,
  userId,
  year,
  pathname,
  isFavorite,
  ...props
}: Omit<CallToActionProps, "isWatched" | "isWatchlist"> &
  React.ComponentProps<typeof Button>) {
  const [isPending, startTransition] = useTransition();
  const [isAddedToFavorite, setIsAddedToFavorite] = useState(false);

  React.useEffect(() => {
    setIsAddedToFavorite(isFavorite);
  }, [isFavorite, setIsAddedToFavorite]);

  return (
    <BaseFavoriteButton
      isAddedToFavorite={isAddedToFavorite}
      isPending={isPending}
      variant="outline"
      onClick={() =>
        startTransition(async () => {
          await isTitleFavorite({
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

export function BaseFavoriteButton({
  isAddedToFavorite,
  isPending,
  ...props
}: { isAddedToFavorite?: boolean; isPending?: boolean } & React.ComponentProps<
  typeof Button
>) {
  return (
    <Button disabled={isPending} variant="outline" {...props}>
      {isAddedToFavorite ? (
        <HeartIcon className="text-primary" />
      ) : (
        <HeartPlusIcon />
      )}
      {isAddedToFavorite ? "I love it" : "Favorite"} {isPending && <Spinner />}
    </Button>
  );
}
