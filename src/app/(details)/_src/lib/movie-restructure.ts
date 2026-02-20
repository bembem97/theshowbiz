import {
  getImagePathname,
  getPrettyDate,
  getReadableTime,
  getUSDCurrency,
} from "@/lib/utils";
import {
  ApiMovieDetailsProps,
  FilmDetailsProps,
  MovieMetadataProps,
} from "../type/main-types";
import { getTrailerVideo } from "@/module/gallery/lib";

export const getMovieMainDetails = (
  value: ApiMovieDetailsProps,
): FilmDetailsProps => ({
  backdrop_path: getImagePathname(value.backdrop_path, "backdrop"),
  certification: value.release_dates.results
    .find((prop) => {
      if (prop.iso_3166_1 === "PH") return prop.iso_3166_1;

      return prop.iso_3166_1 === value.origin_country[0]
        ? prop.iso_3166_1
        : undefined;
    })
    ?.release_dates.find((prop) => prop.certification)?.certification,
  directors: value.credits.crew
    .filter(({ department }) => department.toLowerCase() === "directing")
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 3)
    .map(({ id, name }) => ({
      id,
      name,
    })),
  casts: value.credits.cast
    .sort((a, b) => a.order - b.order)
    .slice(0, 3)
    .map(({ id, name }) => ({ id, name })),
  genres: value.genres,
  id: value.id,
  overview: value.overview,
  poster_path: getImagePathname(value.poster_path),
  date: getPrettyDate({ date: value.release_date, style: "long" }),
  runtime: getReadableTime(value.runtime),
  tagline: value.tagline,
  title: value.title,
  trailer: getTrailerVideo(value.videos.results),
  vote_average: value.vote_average.toFixed(1),
  vote_count: value.vote_count,
  pathname: value.poster_path,
  media_type: "movie",
});

export const getMovieMetadata = (
  value: ApiMovieDetailsProps,
): MovieMetadataProps => ({
  date: getPrettyDate({ date: value.release_date, style: "long" }),
  id: value.id,
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
  media_type: "movie",
  budget: getUSDCurrency(value.budget),
  revenue: getUSDCurrency(value.revenue),
});
