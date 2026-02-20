"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { EyeIcon } from "lucide-react";
import React, { useState, useTransition } from "react";
import { CallToActionProps } from "../../types/call-to-action";
import { isTitleWatched } from "../../action/call-to-action/cud";

export default function WatchedButton({
  mediaType,
  mediaTypeTitleId,
  title,
  titleId,
  userId,
  year,
  pathname,
  isWatched,
  ...props
}: Omit<CallToActionProps, "isFavorite" | "isWatchlist"> &
  React.ComponentProps<typeof Button>) {
  const [isPending, startTransition] = useTransition();
  const [isAddedToWatched, setIsAddedToWatched] = useState(false);

  React.useEffect(() => {
    setIsAddedToWatched(isWatched);
  }, [isWatched, setIsAddedToWatched]);

  return (
    <BaseWatchedButton
      isAddedToWatched={isAddedToWatched}
      isPending={isPending}
      variant="outline"
      onClick={() =>
        startTransition(async () => {
          await isTitleWatched({
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

export function BaseWatchedButton({
  isAddedToWatched,
  isPending,
  ...props
}: { isAddedToWatched?: boolean; isPending?: boolean } & React.ComponentProps<
  typeof Button
>) {
  return (
    <Button disabled={isPending} variant="outline" {...props}>
      {isAddedToWatched ? <EyeIcon className="text-primary" /> : <EyeIcon />}
      {isAddedToWatched ? "Watched" : "Mark as watched"}{" "}
      {isPending && <Spinner />}
    </Button>
  );
}
