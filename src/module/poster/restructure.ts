import { getImagePathname, getPrettyDate } from "@/lib/utils";
import { MovieMediaProps, TvMediaProps } from "@/types/showbiz";
import { MovieProps, TvShowProps } from "@/types/titles";
import { StarProps as ApiStarProps } from "@/types/stars";

export interface TitleDetailsProps {
  id: number;
  media_type: "movie" | "tv";
  poster_path: string;
  title: string;
  rating: string | number;
  year: string | null;
}

export interface PersonDetailsProps {
  id: number;
  name: string;
  profile_path: string;
  known_for_department: string | null | undefined;
}

type Props = MovieProps | TvShowProps | MovieMediaProps | TvMediaProps;

export function getTitleDetails(data: Props): TitleDetailsProps {
  const { id, vote_average, poster_path } = data;

  const title = "title" in data ? data.title : data.name;
  const media_type =
    "media_type" in data && data.media_type === "movie" ? "movie" : "tv";
  const date =
    "release_date" in data
      ? getPrettyDate({ date: data.release_date, style: "year" })
      : getPrettyDate({ date: data.first_air_date, style: "year" });

  const result: TitleDetailsProps = {
    id,
    media_type,
    poster_path: getImagePathname(poster_path, "poster"),
    title,
    rating: Number(vote_average.toFixed(1)) || "n/a",
    year: date ? date : null,
  };

  return result;
}

export function getPersonDetails(props: ApiStarProps): PersonDetailsProps {
  const { id, name, profile_path, known_for_department } = props;

  const result = {
    id,
    name,
    profile_path: getImagePathname(profile_path, "poster"),
    known_for_department,
  };

  return result;
}
