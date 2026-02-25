import { PersonDetailsProps, TitleDetailsProps } from "./restructure";
import { Route } from "next";
import { cn } from "@/lib/utils";
import { DateBadge } from "@/components/custom/Badge";
import { ImageLink } from "@/components/custom/Link";
import DynamicScore from "./score";

export function TitleDetailsPoster({
  className,
  data,
}: {
  className?: string;
  data: TitleDetailsProps;
}) {
  const { id, media_type, poster_path, rating, title, year } = data;
  return (
    <figure className={cn("flex flex-col gap-y-1", className)}>
      <ImageLink
        src={poster_path}
        alt={title}
        href={`/${media_type}/${id}` as Route}
        className="aspect-2/3"
      />
      <figcaption className="mt-1 space-y-1.5 px-1">
        <p className="line-clamp-1 text-xs md:text-sm">{title}</p>
        <div className="flex items-center gap-x-1 *:px-0">
          <DateBadge value={year} />
          <DynamicScore
            mediaType={media_type}
            titleId={id}
            voteAverage={rating as string}
          />
        </div>
      </figcaption>
    </figure>
  );
}

export function PersonDetailsPoster({
  className,
  data,
}: {
  className?: string;
  data: PersonDetailsProps;
}) {
  const { id, known_for_department, name, profile_path } = data;

  return (
    <figure className="flex w-full flex-col">
      <ImageLink
        href={`/person/${id}` as Route}
        alt={name}
        src={profile_path}
        className={cn("aspect-square rounded-full border", className)}
      />
      <figcaption className="mt-1 flex flex-col items-center px-1">
        <p className="3xl:text-base text-center text-xs xl:text-sm">{name}</p>
        <span className="text-muted-foreground 3xl:text-base text-xs xl:text-sm">
          {known_for_department}
        </span>
      </figcaption>
    </figure>
  );
}
