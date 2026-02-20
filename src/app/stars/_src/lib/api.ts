"use cache";

import { API_KEY, API_URL } from "@/lib/constant";
import { extFetch } from "@/lib/fetch";
import { getPersonDetails } from "@/module/poster/restructure";
import { StarApiResponse } from "@/types/stars";
import { cacheLife } from "next/cache";

export default async function getStars(page: number) {
  cacheLife("weeks");

  const response = await extFetch<StarApiResponse>(
    `${API_URL}person/popular?api_key=${API_KEY}&language=en-US&page=${page || 1}`,
  );
  const data = response.results.map((v) => getPersonDetails(v));

  return data;
}
