"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EllipsisVerticalIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  TrashIcon,
} from "lucide-react";
import {
  upHelpfulReaction,
  deleteComment,
  downHelpfulReaction,
} from "../db/cud";
import { useRouter } from "next/navigation";
import { GetTitleAndTypeProps } from "../types";
import { Spinner } from "@/components/ui/spinner";

export function ThreadActionDropdown({
  commentId,
  mediaType,
  titleId,
}: GetTitleAndTypeProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger render={<Button size="icon" variant="ghost" />}>
        <EllipsisVerticalIcon />
        <span className="sr-only">option menu</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DeleteThreadComment
          commentId={commentId}
          mediaType={mediaType}
          titleId={titleId}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DeleteThreadComment({
  commentId,
  mediaType,
  titleId,
}: GetTitleAndTypeProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [result, setResult] = React.useState<{
    disabled: boolean;
    label: string;
  }>({
    label: "Delete",
    disabled: false,
  });

  return (
    <Button
      disabled={isPending}
      className="w-full border-none"
      onClick={() => {
        startTransition(async () => {
          const result = await deleteComment({ commentId, mediaType, titleId });

          if (result.success) {
            setResult({ disabled: false, label: "Delete" });
          } else {
            setResult({
              disabled: true,
              label: result.message || "Something went wrong.",
            });
          }

          router.refresh();
        });
      }}
    >
      <TrashIcon />
      {result.label}
      {isPending && <Spinner />}
    </Button>
  );
}

export function IsHelpfulButton({
  reviewId,
  userId,
  ...props
}: {
  reviewId: string;
  userId: string | undefined;
} & React.ComponentProps<typeof Button>) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      {...props}
      disabled={isPending}
      variant="ghost"
      size="icon"
      onClick={() =>
        startTransition(async () => {
          await upHelpfulReaction({
            reviewId,
            userId,
          });
        })
      }
    >
      {isPending ? <Spinner /> : <ThumbsUpIcon />}
    </Button>
  );
}

export function IsNotHelpfulButton({
  reviewId,
  userId,
  ...props
}: {
  reviewId: string;
  userId: string | undefined;
} & React.ComponentProps<typeof Button>) {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      {...props}
      disabled={isPending}
      variant="ghost"
      size="icon"
      onClick={() =>
        startTransition(async () => {
          await downHelpfulReaction({
            reviewId,
            userId,
          });
        })
      }
    >
      {isPending ? <Spinner /> : <ThumbsDownIcon />}
    </Button>
  );
}
