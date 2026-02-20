"use cache";

import { API_KEY, API_URL } from "@/lib/constant";
import { extFetch } from "@/lib/fetch";
import { getTitleDetails } from "@/module/poster/restructure";
import { TvShowApiResponse } from "@/types/titles";
import { cacheLife } from "next/cache";

export async function getActionAndAdventureShows() {
  cacheLife("weeks");
  const response = await extFetch<TvShowApiResponse>(
    `${API_URL}discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10759&without_genres=16|18|35&api_key=${API_KEY}`,
  );

  return response.results.map((value) => getTitleDetails(value));
}

export async function getAnimatedShows() {
  cacheLife("weeks");
  const response = await extFetch<TvShowApiResponse>(
    `${API_URL}discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16&api_key=${API_KEY}`,
  );

  return response.results.map((value) => getTitleDetails(value));
}

export async function getComedyShows() {
  cacheLife("weeks");
  const response = await extFetch<TvShowApiResponse>(
    `${API_URL}discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35&without_genres=16|18&api_key=${API_KEY}`,
  );

  return response.results.map((value) => getTitleDetails(value));
}

export async function getCrimeShows() {
  cacheLife("weeks");
  const response = await extFetch<TvShowApiResponse>(
    `${API_URL}discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=80&api_key=${API_KEY}`,
  );

  return response.results.map((value) => getTitleDetails(value));
}

export async function getDocumentaryShows() {
  cacheLife("weeks");
  const response = await extFetch<TvShowApiResponse>(
    `${API_URL}discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=99,10768,80&api_key=${API_KEY}`,
  );

  return response.results.map((value) => getTitleDetails(value));
}

export async function getDramaShows() {
  cacheLife("weeks");
  const response = await extFetch<TvShowApiResponse>(
    `${API_URL}discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=18&api_key=${API_KEY}`,
  );

  return response.results.map((value) => getTitleDetails(value));
}

export async function getKidsAndFamilyShows() {
  cacheLife("weeks");
  const response = await extFetch<TvShowApiResponse>(
    `${API_URL}discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16,10762&without_keywords=210024&api_key=${API_KEY}`,
  );

  return response.results.map((value) => getTitleDetails(value));
}

export async function getMysteryShows() {
  cacheLife("weeks");
  const response = await extFetch<TvShowApiResponse>(
    `${API_URL}discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=9648&api_key=${API_KEY}`,
  );

  return response.results.map((value) => getTitleDetails(value));
}

export async function getRealityShows() {
  cacheLife("weeks");
  const response = await extFetch<TvShowApiResponse>(
    `${API_URL}discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&first_air_date.gte=2010-01-01&with_genres=10764&api_key=${API_KEY}`,
  );

  return response.results.map((value) => getTitleDetails(value));
}

export async function getSciFiAndFantasyShows() {
  cacheLife("weeks");
  const response = await extFetch<TvShowApiResponse>(
    `${API_URL}discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10765&api_key=${API_KEY}`,
  );

  return response.results.map((value) => getTitleDetails(value));
}

export async function getTalkShows() {
  cacheLife("weeks");
  const response = await extFetch<TvShowApiResponse>(
    `${API_URL}discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10767&api_key=${API_KEY}`,
  );

  return response.results.map((value) => getTitleDetails(value));
}
