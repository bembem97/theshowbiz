import {
  getImagePathname,
  getNumberCompact,
  getPrettyDate,
  getReadableTime,
} from "@/lib/utils";
import { EpisodeProps, SeasonProps } from "@/types/title-details";
import {
  ApiTvDetailsProps,
  EpisodeDetailsProps,
  SeasonDetailsProps,
  ShowDetailsProps,
  ShowMetadataProps,
} from "../type/main-types";
import { getTrailerVideo } from "@/module/gallery/lib";

export const getSeasonLatestYear = (value: SeasonProps[]) =>
  getPrettyDate({
    date: value
      .filter(({ name }) => name.toLowerCase() !== "specials")
      .filter(({ air_date }) => air_date !== null)
      .find(({ season_number }, _, arr) => season_number === arr.length)
      ?.air_date,
    style: "year",
  }) || "?";

export const getEpisodeInfo = (
  value: EpisodeProps | null,
): EpisodeDetailsProps | null => {
  if (!value) return null;

  return {
    air_date: getPrettyDate({ date: value.air_date }) || "",
    episode_number: value.episode_number,
    name: value.name,
    overview: value.overview,
    runtime: getReadableTime(value.runtime),
    season_number: value.season_number,
    vote_average: Number(value.vote_average.toFixed(1)),
    vote_count: getNumberCompact(value.vote_count),
  };
};

export const getSeasonInfo = (value: SeasonProps[]): SeasonDetailsProps[] =>
  value
    .filter(({ name }) => name.toLowerCase() !== "specials")
    .map(
      ({
        air_date,
        episode_count,
        id,
        name,
        overview,
        season_number,
        vote_average,
      }) => ({
        air_date: getPrettyDate({ date: air_date }),
        episode_count,
        name,
        id,
        overview,
        season_number,
        vote_average,
      }),
    );

export const getShowMainDetails = ({
  sfy,
  sly,
  ...value
}: ApiTvDetailsProps & {
  sly: string;
  sfy: string | null;
}): ShowDetailsProps => ({
  backdrop_path: getImagePathname(value.backdrop_path, "backdrop"),
  casts: value.aggregate_credits.cast
    .sort((a, b) => a.order - b.order)
    .slice(0, 3)
    .map(({ id, name }) => ({ id, name })),
  certification: value.content_ratings.results.find((prop) => {
    if (prop.iso_3166_1 === "PH") return prop.iso_3166_1;
    if (prop.iso_3166_1 === "US") return prop.iso_3166_1;

    return prop.iso_3166_1 === value.origin_country[0]
      ? prop.iso_3166_1
      : undefined;
  })?.rating,
  date: getPrettyDate({ date: value.first_air_date, style: "long" }),
  directors: value.created_by
    .map(({ id, name, profile_path }) => ({
      id,
      name,
      profile_path: getImagePathname(profile_path, "poster"),
    }))
    .slice(0, 3),
  genres: value.genres,
  id: value.id,
  overview: value.overview,
  pathname: value.poster_path,
  poster_path: getImagePathname(value.poster_path, "poster"),
  tagline: value.tagline,
  title: value.name,
  trailer: getTrailerVideo(value.videos.results),
  vote_average: value.vote_average.toFixed(1),
  vote_count: value.vote_count,
  season_range: sfy === sly ? sfy : `${sfy}${"–" + sly}`,
  media_type: "tv",
});

export const getTvMetadata = (value: ApiTvDetailsProps): ShowMetadataProps => ({
  date: getPrettyDate({ date: value.first_air_date, style: "long" }),
  id: value.id,
  networks: value.networks.map(({ id, logo_path, name }) => ({
    id,
    logo_path: getImagePathname(logo_path, "avatar") as string,
    name,
  })),
  original_language: value.original_language,
  production_companies: value.production_companies.map(
    ({ logo_path, ...props }) => ({
      ...props,
      logo_path: getImagePathname(logo_path),
    }),
  ),
  production_countries: value.production_countries,
  spoken_languages: value.spoken_languages,
  status: value.status,
  total_episodes:
    value.number_of_episodes > 1
      ? `${value.number_of_episodes} Episodes`
      : `${value.number_of_episodes} Episode`,
  total_seasons:
    value.number_of_seasons > 1
      ? `${value.number_of_seasons} Seasons`
      : `${value.number_of_seasons} Season`,
  type: value.type,
  media_type: "tv",
});
