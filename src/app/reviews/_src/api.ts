import { API_KEY, API_URL } from "@/lib/constant";
import { extFetch } from "@/lib/fetch";
import { getImagePathname, getPrettyDate } from "@/lib/utils";
import { MovieDetailsProps, TvDetailsProps } from "@/types/title-details";

export type ReviewTitleProps = {
  mediaType: "movie" | "tv";
  titleId: string;
};

export async function getReviewTitleApi({
  mediaType,
  titleId,
}: ReviewTitleProps) {
  "use cache";
  const result = await extFetch<MovieDetailsProps | TvDetailsProps>(
    `${API_URL}${mediaType}/${titleId}?language=en-US&api_key=${API_KEY}`,
  );

  const { backdrop_path, poster_path } = result;

  if ("name" in result) {
    const { name, first_air_date } = result;

    return {
      backdrop_path: getImagePathname(backdrop_path, "backdrop"),
      poster_path: getImagePathname(poster_path, "poster"),
      title: name,
      year: getPrettyDate({ date: first_air_date, style: "year" }),
    };
  }

  const { release_date, title } = result;

  return {
    backdrop_path: getImagePathname(backdrop_path, "backdrop"),
    poster_path: getImagePathname(poster_path, "poster"),
    title,
    year: getPrettyDate({ date: release_date, style: "year" }),
  };
}
