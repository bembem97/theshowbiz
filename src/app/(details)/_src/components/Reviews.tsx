import { Item, ItemContent } from "@/components/ui/item";
import { ChevronRightIcon, MessageSquareTextIcon } from "lucide-react";
import { Route } from "next";
import Link from "next/link";
import React from "react";

export default function Reviews({
  mediaType,
  titleId,
}: {
  mediaType: "movie" | "tv";
  titleId: number;
}) {
  return (
    <div className="p-2">
      <Item variant="outline">
        <ItemContent className="grid h-9 grid-cols-1 grid-rows-1">
          <Link
            href={`/reviews/${mediaType}/${titleId}` as Route}
            className="text-foreground inline-flex items-center gap-x-2"
          >
            <MessageSquareTextIcon className="size-3.5" />
            Read Reviews
            <ChevronRightIcon className="text-primary" />
          </Link>
        </ItemContent>
      </Item>
    </div>
  );
}
