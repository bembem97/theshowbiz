"use cache";

import { API_KEY, API_URL } from "@/lib/constant";
import { extFetch } from "@/lib/fetch";
import { getImagePathname, getPrettyDate, getVoteAverage } from "@/lib/utils";
import { getTrailerVideo } from "@/module/gallery/lib";
import { VideosApiResponse } from "@/types/galleries";
import {
  MovieMediaApiResponse,
  MovieMediaProps,
  TvMediaApiResponse,
  TvMediaProps,
} from "@/types/showbiz";
import { HeroProps } from "../types";
import { cacheLife } from "next/cache";

export async function getApi(): Promise<HeroProps[]> {
  cacheLife("weeks");
  const resMovies = extFetch<MovieMediaApiResponse>(
    `${API_URL}trending/movie/week?language=en-US&api_key=${API_KEY}`,
  );
  const resShows = extFetch<TvMediaApiResponse>(
    `${API_URL}trending/tv/week?language=en-US&api_key=${API_KEY}`,
  );

  const [movies, shows] = await Promise.all([resMovies, resShows]);

  const { results: movieResult } = movies as MovieMediaApiResponse;
  const { results: tvResult } = shows as TvMediaApiResponse;

  const titles = Promise.all(
    [...movieResult, ...tvResult]
      .sort((a, b) => b.vote_average - a.vote_average)
      .slice(0, 6)
      .map(restructure),
  );

  return titles;
}

async function restructure(props: MovieMediaProps | TvMediaProps) {
  const { backdrop_path, id, media_type, vote_average } = props;

  const video = await extFetch<VideosApiResponse>(
    `${API_URL}${media_type}/${id}/videos?api_key=${API_KEY}&language=en-US`,
  );

  if ("name" in props) {
    const { first_air_date, name } = props;
    return {
      backdrop_path: getImagePathname(backdrop_path, "backdrop"),
      id,
      media_type,
      vote_average: getVoteAverage(vote_average),
      release_date: getPrettyDate({ date: first_air_date, style: "long" }),
      title: name,
      trailer: getTrailerVideo(video.results),
    };
  }

  const { release_date, title } = props;
  return {
    backdrop_path: getImagePathname(backdrop_path),
    id,
    media_type,
    vote_average: getVoteAverage(vote_average),
    release_date: getPrettyDate({ date: release_date, style: "long" }),
    title,
    trailer: getTrailerVideo(video.results),
  };
}
