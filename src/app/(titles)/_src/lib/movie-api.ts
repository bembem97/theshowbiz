"use cache";

import { API_KEY, API_URL } from "@/lib/constant";
import { extFetch } from "@/lib/fetch";
import { getTitleDetails } from "@/module/poster/restructure";
import { MovieApiResponse } from "@/types/titles";
import { cacheLife } from "next/cache";

export async function getActionMovies() {
  cacheLife("weeks");
  const response = await extFetch<MovieApiResponse>(
    `${API_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28&without_genres=16&api_key=${API_KEY}`,
  );

  return response.results.map((value) =>
    getTitleDetails({ ...value, media_type: "movie" }),
  );
}

export async function getAnimatedAdventureMovies() {
  cacheLife("weeks");
  const response = await extFetch<MovieApiResponse>(
    `${API_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=12,16&api_key=${API_KEY}`,
  );

  return response.results.map((value) =>
    getTitleDetails({ ...value, media_type: "movie" }),
  );
}

export async function getComedyMovies() {
  cacheLife("weeks");
  const response = await extFetch<MovieApiResponse>(
    `${API_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35&api_key=${API_KEY}`,
  );

  return response.results.map((value) =>
    getTitleDetails({ ...value, media_type: "movie" }),
  );
}

export async function getFamilyMovies() {
  cacheLife("weeks");
  const response = await extFetch<MovieApiResponse>(
    `${API_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10751&api_key=${API_KEY}`,
  );

  return response.results.map((value) =>
    getTitleDetails({ ...value, media_type: "movie" }),
  );
}

export async function getFantasyMovies() {
  cacheLife("weeks");
  const response = await extFetch<MovieApiResponse>(
    `${API_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=14&api_key=${API_KEY}`,
  );

  return response.results.map((value) =>
    getTitleDetails({ ...value, media_type: "movie" }),
  );
}

export async function getHorrorMovies() {
  cacheLife("weeks");
  const response = await extFetch<MovieApiResponse>(
    `${API_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27&api_key=${API_KEY}`,
  );

  return response.results.map((value) =>
    getTitleDetails({ ...value, media_type: "movie" }),
  );
}

export async function getMysteryMovies() {
  cacheLife("weeks");
  const response = await extFetch<MovieApiResponse>(
    `${API_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=9648&api_key=${API_KEY}`,
  );

  return response.results.map((value) =>
    getTitleDetails({ ...value, media_type: "movie" }),
  );
}

export async function getSciFiMovies() {
  cacheLife("weeks");
  const response = await extFetch<MovieApiResponse>(
    `${API_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=878&api_key=${API_KEY}`,
  );

  return response.results.map((value) =>
    getTitleDetails({ ...value, media_type: "movie" }),
  );
}

export async function getThrillerMovies() {
  cacheLife("weeks");
  const response = await extFetch<MovieApiResponse>(
    `${API_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=53&api_key=${API_KEY}`,
  );

  return response.results.map((value) =>
    getTitleDetails({ ...value, media_type: "movie" }),
  );
}

export async function getWesternMovies() {
  cacheLife("weeks");
  const response = await extFetch<MovieApiResponse>(
    `${API_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=37&api_key=${API_KEY}`,
  );

  return response.results.map((value) =>
    getTitleDetails({ ...value, media_type: "movie" }),
  );
}
