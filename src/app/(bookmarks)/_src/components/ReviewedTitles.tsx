import { DateBadge, ScoreBadge } from "@/components/custom/Badge";
import { PosterImage } from "@/components/ui/image";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@/components/ui/list";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import { Route } from "next";
import Link from "next/link";
import React from "react";

export interface ReviewedTitlesDataProps {
  title: string;
  mediaType: "MOVIE" | "TV";
  titleId: number;
  year: number | null;
  pathname: string | null;
  rating: number | null;
  content?: string | null;
}

interface ReviewedTitlesProps extends React.ComponentProps<typeof List> {
  data: ReviewedTitlesDataProps[];

  emptyMessage: string;
}

export default function ReviewedTitles({
  className,
  data,
  emptyMessage,
  ...props
}: ReviewedTitlesProps) {
  if (!Boolean(data.length) || !data) {
    return (
      <div className="p-2">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <List className={cn("space-y-0 gap-y-0 p-0", className)} {...props}>
      {data.map(
        ({ content, mediaType, pathname, rating, title, titleId, year }, i) => (
          <ListItem
            key={`${mediaType}:${titleId}:${i + 1}`}
            className="flex-col border-b p-0"
          >
            <ListItemButton
              className="h-max w-full"
              nativeButton={false}
              render={
                <Link
                  href={
                    `/${mediaType.toLowerCase() as "movie" | "tv"}/${titleId}` as Route
                  }
                />
              }
            >
              <ListItemAvatar className="aspect-square size-12">
                <PosterImage
                  width={150}
                  height={150}
                  alt={title}
                  src={pathname || "/poster.png"}
                />
              </ListItemAvatar>
              <ListItemText>
                <h2 className="typography-h4 line-clamp-1 text-sm">{title}</h2>
                <div className="flex items-center gap-x-1">
                  <DateBadge value={year} className="px-0" />
                  <ScoreBadge
                    value={rating ? `Your score: ${rating}` : null}
                    className="px-0"
                  >
                    {!Boolean(rating) ? (
                      <span className="text-xs">Not rated</span>
                    ) : null}
                  </ScoreBadge>
                </div>
              </ListItemText>
            </ListItemButton>
            <div className="w-full">
              <div className="px-2 pb-4">
                <h6 className="sr-only">Your comment</h6>
                <p className="text-muted-foreground line-clamp-4 text-sm">
                  {content || "No review"}
                </p>
                <Link
                  className="text-muted-foreground hover:text-foreground 3xl:ml-0 ml-auto flex w-max items-center text-xs hover:underline"
                  href={
                    `/reviews/${mediaType.toLowerCase() as "movie" | "tv"}/${titleId}` as Route
                  }
                >
                  Read Review
                  <ChevronRightIcon className="text-primary size-4" />
                </Link>
              </div>
            </div>
          </ListItem>
        ),
      )}
    </List>
  );
}
