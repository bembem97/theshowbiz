import { extFetch } from "@/lib/fetch";
import {
  ApiMovieDetailsProps,
  FilmDetailsProps,
  MovieMetadataProps,
} from "../type/main-types";
import { API_KEY, API_URL } from "@/lib/constant";
import { getMovieMainDetails, getMovieMetadata } from "./movie-restructure";
import { getTitleDetails } from "@/module/poster/restructure";
import { getPhotoProps, getTitleVideos } from "@/lib/utils";

export async function getMovieDetailsAPI(paramId: string) {
  const r = await extFetch<ApiMovieDetailsProps>(
    `${API_URL}movie/${paramId}?language=en-US&api_key=${API_KEY}&append_to_response=release_dates,credits,videos,keywords,similar,images`,
  );

  const details: FilmDetailsProps = getMovieMainDetails(r);

  const metadata: MovieMetadataProps = getMovieMetadata(r);

  const photos = getPhotoProps({
    data: [...r.images.posters, ...r.images.backdrops],
    media_type: "movie",
    id: r.id,
  });

  const videos = getTitleVideos({
    data: r.videos.results,
    media_type: "movie",
    id: r.id,
  });

  const similar = r.similar.results.map((value) => getTitleDetails(value));

  return {
    details,
    metadata,
    photos,
    videos,
    similar,
    keywords: r.keywords.keywords,
  };
}
