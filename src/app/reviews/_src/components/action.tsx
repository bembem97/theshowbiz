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
import { toast } from "sonner";

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
      <DropdownMenuContent align="end" className="bg-background">
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
            toast("Comment", { description: "Your comment is deleted." });
          } else {
            setResult({
              disabled: true,
              label: result.message || "Something went wrong.",
            });
            toast("Error", { description: result.message });
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
          const response = await upHelpfulReaction({
            reviewId,
            userId,
          });

          if (!response) return;

          if (response.success === false) {
            toast("Error", { description: response.message });
          }
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
          const response = await downHelpfulReaction({
            reviewId,
            userId,
          });
          if (!response) return;

          if (response.success === false) {
            toast("Error", { description: response.message });
          }
        })
      }
    >
      {isPending ? <Spinner /> : <ThumbsDownIcon />}
    </Button>
  );
}
