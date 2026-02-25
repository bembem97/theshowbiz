import { Item, ItemContent } from "@/components/ui/item";
import { DateBadge, ScoreBadge, SeasonBadge } from "@/components/custom/Badge";
import React from "react";
import { SeasonDetailsProps } from "../type/main-types";
import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<typeof Item> {
  data: SeasonDetailsProps | null;
}

export default function SeasonInfo({ data, className, ...props }: Props) {
  if (!data) return null;

  const {
    air_date,
    episode_count,
    id,
    name,
    overview,
    season_number,
    vote_average,
  } = data;

  // const SEASON = `${season_number} ${season_number > 1 ? "seasons" : "season"}`;
  const EPISODE = `${episode_count} ${episode_count > 1 ? "episodes" : "episode"}`;

  return (
    <Item
      key={id}
      variant="outline"
      className={cn("items-start p-0", className)}
      {...props}
    >
      <ItemContent className="divide-y *:[div]:py-2.5">
        <div className="flex items-center justify-between px-3">
          <span className="typography-h4 text-foreground dark:text-white">{name}</span>
          <ScoreBadge value={vote_average} />
        </div>

        <div className="flex items-center justify-between">
          <DateBadge value={air_date} />
          <SeasonBadge value={`Season ${season_number}`} />
          <SeasonBadge value={EPISODE} />
        </div>

        <div className="px-3">
          <p className="text-xs text-foreground dark:text-white">{overview}</p>
        </div>
      </ItemContent>
    </Item>
  );
}
