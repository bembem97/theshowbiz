import { MovieMediaProps, StarMediaProps, TvMediaProps } from "@/types/showbiz";
import { CategoryProps, ShowbizProps } from "./types";
import { getImagePathname } from "@/lib/utils";

export default function getShowbiz(
  data: (MovieMediaProps | TvMediaProps | StarMediaProps)[],
) {
  const restructure: ShowbizProps[] = data
    .sort((a, b) => b.popularity - a.popularity)
    .map((prop) => {
      const { id, media_type } = prop;
      if (media_type === "person") {
        const { name, known_for_department, profile_path } = prop;
        return {
          id,
          media_type: "person",
          title: name,
          subtext: known_for_department || null,
          pathname: getImagePathname(profile_path, "avatar"),
        };
      }

      if (media_type === "tv") {
        const { name, first_air_date, poster_path } = prop;

        return {
          id,
          media_type: "tv",
          title: name,
          subtext: new Date(first_air_date).getFullYear().toString() || null,
          pathname: getImagePathname(poster_path, "poster"),
        };
      }

      const { release_date, title, poster_path } = prop;

      return {
        id,
        media_type: "movie",
        title,
        subtext: new Date(release_date).getFullYear().toString() || null,
        pathname: getImagePathname(poster_path, "poster"),
      };
    });

  const orderBy = restructure.reduce((acc, cur) => {
    if (!acc[cur.media_type]) {
      acc[cur.media_type] = [];
    }
    acc[cur.media_type].push(cur);

    return acc;
  }, {} as CategoryProps);

  const category = Object.keys(orderBy).map((ctgy) => ({
    type: ctgy,
    info: orderBy[ctgy],
  }));

  return category;
}
