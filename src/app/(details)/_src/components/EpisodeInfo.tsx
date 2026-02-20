import {
  Item,
  ItemActions,
  ItemContent,
  ItemSeparator,
} from "@/components/ui/item";
import { EpisodeDetailsProps } from "../type/main-types";
import {
  DateBadge,
  ScoreBadge,
  SeasonBadge,
  TimeDurationBadge,
  VoteCountBadge,
} from "@/components/custom/Badge";
import React from "react";
import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<typeof Item> {
  data: EpisodeDetailsProps | null;
}

export default function EpisodeInfo({
  data,
  className,
  status,
  ...props
}: Props & { status: "next" | "last" }) {
  if (!data) return null;

  const {
    air_date,
    episode_number,
    name,
    overview,
    runtime,
    season_number,
    vote_average,
    vote_count,
  } = data;

  // const SEASON = `${season_number} ${season_number > 1 ? "seasons" : "season"}`;
  // const EPISODE = `${episode_number} ${episode_number > 1 ? "episodes" : "epidode"}`;
  // const enOrdinalRules = new Intl.PluralRules("en-US", { type: "ordinal" });
  // const EPISODE = enOrdinalRules.select(episode_number);

  return (
    <Item
      variant="outline"
      className={cn("items-start p-0", className)}
      {...props}
    >
      <ItemContent className="divide-y *:[div]:py-2.5">
        <div className="flex items-center justify-between gap-x-2 divide-x px-3">
          <span className="typography-h4 text-foreground w-full">{name}</span>
          <div className="flex flex-col self-start">
            <ScoreBadge value={vote_average} className="p-0" />
            <VoteCountBadge value={vote_count} className="p-0" />
          </div>
        </div>
        <div>
          <SeasonBadge value={`Season ${season_number}`} />
          <SeasonBadge
            value={`Episode ${episode_number}`}
            className="*:[svg]:text-secondary"
          />
          <TimeDurationBadge value={runtime} />
          <DateBadge value={air_date} />
        </div>

        <Item className="p-0 px-3">
          <ItemContent>
            <p>{overview}</p>
          </ItemContent>
          <ItemSeparator orientation="vertical" />
          <ItemActions>
            <span className="text-muted-foregorund text-xs">
              {status === "next" ? "Next Episode" : "Last Episode"}
            </span>
          </ItemActions>
        </Item>
      </ItemContent>
    </Item>
  );
}
