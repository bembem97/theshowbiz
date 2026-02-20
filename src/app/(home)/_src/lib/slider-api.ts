"use cache";

import { API_KEY, API_URL } from "@/lib/constant";
import { extFetch } from "@/lib/fetch";
import { getPersonDetails, getTitleDetails } from "@/module/poster/restructure";
import { StarApiResponse } from "@/types/stars";
import { MovieApiResponse, TvShowApiResponse } from "@/types/titles";
import { cacheLife } from "next/cache";

export async function getPopularMovies() {
  cacheLife("weeks");
  const response = await extFetch<MovieApiResponse>(
    `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
  );

  return response.results.map((value) =>
    getTitleDetails({ ...value, media_type: "movie" }),
  );
}

export async function getPopularShows() {
  cacheLife("weeks");
  const response = await extFetch<MovieApiResponse>(
    `${API_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
  );

  return response.results.map((value) =>
    getTitleDetails({ ...value, media_type: "tv" }),
  );
}

export async function getUpcomingMovies() {
  cacheLife("weeks");
  const response = await extFetch<MovieApiResponse>(
    `${API_URL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
  );

  return response.results.map((value) =>
    getTitleDetails({ ...value, media_type: "movie" }),
  );
}

export async function getUpcomingShows() {
  cacheLife("weeks");
  const response = await extFetch<MovieApiResponse>(
    `${API_URL}tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`,
  );

  return response.results.map((value) =>
    getTitleDetails({ ...value, media_type: "tv" }),
  );
}

export async function getOnlyNetflixShows() {
  cacheLife("weeks");
  const response = await extFetch<TvShowApiResponse>(
    `${API_URL}discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=PH&with_watch_providers=8&api_key=${API_KEY}`,
  );

  return response.results.map((value) =>
    getTitleDetails({ ...value, media_type: "tv" }),
  );
}

export async function getPopularStars() {
  cacheLife("weeks");
  const response = await extFetch<StarApiResponse>(
    `${API_URL}person/popular?language=en-US&page=1&api_key=${API_KEY}`,
  );

  return response.results.map((value) => getPersonDetails(value));
}
