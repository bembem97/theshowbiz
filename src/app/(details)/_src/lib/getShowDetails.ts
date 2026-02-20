import { API_KEY, API_URL } from "@/lib/constant";
import { extFetch } from "@/lib/fetch";
import {
  ApiTvDetailsProps,
  ShowDetailsProps,
  ShowMetadataProps,
} from "../type/main-types";
import {
  getEpisodeInfo,
  getShowMainDetails,
  getSeasonInfo,
  getSeasonLatestYear,
  getTvMetadata,
} from "./tv-restructure";
import { getPhotoProps, getPrettyDate, getTitleVideos } from "@/lib/utils";
import { getTitleDetails } from "@/module/poster/restructure";

export async function getShowDetailsAPI(promId: string) {
  const r = await extFetch<ApiTvDetailsProps>(
    `${API_URL}tv/${promId}?language=en-US&api_key=${API_KEY}&append_to_response=content_ratings,aggregate_credits,videos,images,keywords,similar`,
  );

  const LATEST_EPISODE = getEpisodeInfo(r.last_episode_to_air);
  const NEXT_EPISODE = getEpisodeInfo(r.next_episode_to_air);
  const SEASONS = getSeasonInfo(r.seasons);

  const SEASON_LATEST_YEAR = getSeasonLatestYear(r.seasons);
  const SEASON_FIRST_YEAR = getPrettyDate({
    date: r.first_air_date,
    style: "year",
  });
  const DETAILS: ShowDetailsProps = getShowMainDetails({
    ...r,
    sly: SEASON_LATEST_YEAR,
    sfy: SEASON_FIRST_YEAR,
  });

  const METADATA: ShowMetadataProps = getTvMetadata(r);

  const PHOTOS = getPhotoProps({
    data: [...r.images.posters, ...r.images.backdrops],
    media_type: "tv",
    id: r.id,
  });

  const VIDEOS = getTitleVideos({
    data: r.videos.results,
    media_type: "tv",
    id: r.id,
  });

  const SIMILAR = r.similar.results.map((value) => getTitleDetails(value));

  return {
    details: DETAILS,
    episode: { latest: LATEST_EPISODE, next: NEXT_EPISODE },
    seasons: SEASONS,
    metadata: METADATA,
    photos: PHOTOS,
    videos: VIDEOS,
    keywords: r.keywords.results,
    similar: SIMILAR,
  };
}
