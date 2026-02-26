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
import { Route } from "next";
import Link from "next/link";
import React from "react";

interface SavedTitlesProps extends React.ComponentProps<typeof List> {
  data: {
    title: string;
    mediaType: "MOVIE" | "TV";
    titleId: number;
    year: number | null;
    pathname: string | null;
    rating: number | null;
  }[];

  emptyMessage: string;
}

export default function SavedTitles({
  className,
  data,
  emptyMessage,
  ...props
}: SavedTitlesProps) {
  if (!Boolean(data.length) || !data) {
    return (
      <div className="p-2">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <List className={cn("space-y-0 gap-y-0 p-0", className)} {...props}>
      {data.map(({ mediaType, pathname, rating, title, titleId, year }) => (
        <ListItem key={`${mediaType}:${titleId}`} className="border-b p-0">
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
        </ListItem>
      ))}
    </List>
  );
}
