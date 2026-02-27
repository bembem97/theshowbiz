import { ImageLink } from "@/components/custom/Link";
import { FilmDetailsProps, ShowDetailsProps } from "../type/main-types";
import {
  CertificationBadge,
  DateBadge,
  MediaTypeBadge,
  SeasonBadge,
  TimeDurationBadge,
} from "@/components/custom/Badge";
import { Route } from "next";
import { Badge } from "@/components/ui/badge";
import SmallCredit from "./piece/SmallCredit";
import { ImagesIcon, ListVideoIcon, PlayIcon } from "lucide-react";
import MediaBoxLink from "./piece/MediaBoxLink";
import { Separator } from "@/components/ui/separator";
import { Item, ItemActions, ItemDescription } from "@/components/ui/item";
import BackdropTrailer from "./piece/BackdropTrailer";
import { cn, getPrettyDate } from "@/lib/utils";
import TitleRating from "@/module/title-interaction/components/my-rating/TitleRating";
import BookmarkActions from "@/module/title-interaction/components/call-to-action/CallToActions";

export default async function MainDetails({
  data,
}: {
  data: FilmDetailsProps | ShowDetailsProps;
}) {
  const {
    backdrop_path,
    casts,
    certification,
    date,
    directors,
    genres,
    id,
    media_type,
    overview,
    pathname,
    poster_path,
    tagline,
    title,
    trailer,
    vote_average,
    vote_count,
  } = data;

  return (
    <header>
      <div className="top-details p-2">
        <h1 className="title">{title}</h1>

        {/*
         * Title Poster
         * Image Link
         * Video Link
         */}
        <div className="media flex aspect-auto w-full flex-col gap-2 @3xl/details:aspect-square @3xl/details:max-h-72 @3xl/details:flex-row @5xl/details:max-h-96">
          <div className="@3xl/details:max-h-auto flex aspect-video h-full max-h-fit shrink grow gap-x-2">
            <ImageLink
              alt={title}
              src={poster_path}
              href={
                `/${media_type}/${id}/${pathname ? `imageviewer${pathname}` : "images"}` as Route
              }
              className="aspect-2/3 h-full shrink-0 grow-0"
            />
            <div className="relative isolate grid aspect-2/3 h-full shrink grow">
              <BackdropTrailer
                media_type={media_type}
                id={id}
                trailer={trailer}
                backdrop_path={backdrop_path}
                title={title}
              />
              <Item
                variant="outline"
                className={cn(
                  "pointer-events-none absolute top-1/2 left-1/2 z-10 size-max -translate-x-1/2 -translate-y-1/2 rounded-full border-white/80 backdrop-blur-xs",
                  { hidden: !trailer || Object.keys(trailer).length === 0 },
                )}
              >
                <ItemActions>
                  <PlayIcon className="size-9 text-white/80" />
                </ItemActions>
                <ItemDescription className="sr-only">
                  play trailer
                </ItemDescription>
              </Item>
            </div>
          </div>
          <div className="flex shrink-0 grow-0 basis-auto flex-row gap-2 @3xl/details:w-36 @3xl/details:flex-col @5xl/details:w-48">
            <MediaBoxLink
              href={`/${media_type}/${id}/images` as Route}
              label="Photos"
              icon={<ImagesIcon />}
            />
            <MediaBoxLink
              href={`/${media_type}/${id}/videos` as Route}
              label="Videos"
              icon={<ListVideoIcon />}
            />
          </div>
        </div>
        <div className="metadata">
          {/*
           * Media Type | Certification
           * Date Release | Season Range | Time Duration
           * Score Average | User Vote Count
           */}
          <div className="*:border-border flex flex-wrap items-center divide-x overflow-x-auto">
            <div>
              <CertificationBadge value={certification} />
            </div>
            <div>
              <MediaTypeBadge value={media_type} />
            </div>
            <div>
              <DateBadge value={date} />
            </div>
            {media_type === "tv" && (
              <div>
                <SeasonBadge value={data.season_range} />
              </div>
            )}
            {media_type === "movie" && (
              <div>
                <TimeDurationBadge value={data.runtime} />
              </div>
            )}
          </div>
        </div>

        <div className="scoring flex flex-wrap items-center justify-center gap-1 py-4 @xl/details:justify-start @3xl/details:justify-end @3xl/details:py-0">
          <TitleRating
            mediaType={media_type}
            titleId={id}
            voteAverage={vote_average}
            voteCount={vote_count}
            posterPath={poster_path}
            title={title}
            year={getPrettyDate({ date, style: "year" })}
          />
        </div>
      </div>

      <Separator />

      <div className="flex flex-col divide-x @xl/details:flex-row">
        <div className="shrink grow">
          <div className="flex items-center gap-x-2 divide-x overflow-x-auto p-2">
            {/*
             * Genres
             */}
            {genres.map(({ id, name }) => (
              <Badge key={id} variant="outline" className="py-2">
                {name}
              </Badge>
            ))}
          </div>

          <Separator />

          <div className="space-y-4 p-2">
            <p className="text-muted-foreground italic">{tagline}</p>
            <p>{overview}</p>
            {/*
             * Credits
             * Casts And Directors/Creators
             */}
            <SmallCredit
              label={media_type === "tv" ? "Creators" : "Directors"}
              credits={directors}
            />
            <SmallCredit label="Casts" credits={casts} />
          </div>
        </div>

        <div className="flex shrink-0 grow-0 flex-col justify-start gap-y-2 p-2 *:w-full @xl/details:w-64">
          <BookmarkActions
            mediaType={media_type}
            pathname={poster_path}
            titleId={id}
            title={title}
            date={date}
          />
        </div>
      </div>
    </header>
  );
}
