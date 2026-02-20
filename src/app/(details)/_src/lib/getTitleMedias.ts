import {
  ApiMovieDetailsProps,
  ApiTvDetailsProps,
} from "@/app/(details)/_src/type/main-types";
import { API_KEY, API_URL } from "@/lib/constant";
import { extFetch } from "@/lib/fetch";
import { getImagePathname, getPhotoProps, getTitleVideos } from "@/lib/utils";

type GetIdAndTypeProps = {
  titleId: string;
  media_type: "movie" | "tv";
  gallery_type: "videos" | "photos";
};

type GetTitleDetailsAPIProps =
  | Pick<ApiMovieDetailsProps, "id" | "title" | "backdrop_path" | "images">
  | Pick<ApiTvDetailsProps, "id" | "name" | "backdrop_path" | "images">
  | Pick<ApiMovieDetailsProps, "id" | "title" | "backdrop_path" | "videos">
  | Pick<ApiTvDetailsProps, "id" | "name" | "backdrop_path" | "videos">;

export default async function getTitleDetailsAPI({
  gallery_type,
  media_type,
  titleId,
}: GetIdAndTypeProps) {
  const media = gallery_type === "videos" ? "videos" : "images";
  const r = await extFetch<GetTitleDetailsAPIProps>(
    `${API_URL}${media_type}/${titleId}?language=en-US&api_key=${API_KEY}&append_to_response=${media}`,
  );

  if ("images" in r) {
    return {
      backdrop_path: getImagePathname(r.backdrop_path, "backdrop"),
      images: getPhotoProps({
        data: [...r.images.posters, ...r.images.backdrops],
        media_type,
        id: r.id,
        slice: 100,
      }),
      title: "name" in r ? r.name : r.title,
    };
  }

  return {
    backdrop_path: getImagePathname(r.backdrop_path, "backdrop"),
    images: getTitleVideos({ data: r.videos.results, id: r.id, media_type }),
    title: "name" in r ? r.name : r.title,
  };
}
