import { getImagePathname, getPrettyDate } from "@/lib/utils";
import { CastCreditProps, CrewCreditProps } from "@/types/combined-credits";
import { KnownForProps } from "../types/star-credit-types";
import { Route } from "next";

export default function getKnownFor(
  data: (CastCreditProps | CrewCreditProps)[],
) {
  const knownFor: KnownForProps[] = data
    .filter(
      (item) =>
        (item.vote_count > 100 &&
          item.popularity > 2 &&
          "character" in item &&
          !item.character.includes("Self") &&
          !item.character.includes("Self -")) ||
        ("job" in item &&
          (item.job.toLowerCase() === "director" ||
            item.job.toLowerCase() === "producer" ||
            item.job.toLowerCase() === "writer")),
    )
    .sort((a, b) => {
      //todo: Sort by vote_count descending
      const voteCountComparison = b.vote_count - a.vote_count;
      if (voteCountComparison !== 0) {
        return voteCountComparison;
      }

      //todo: If vote_count is equal, sort by order ascending
      const orderA = (a as { order: number }).order ?? Infinity;
      const orderB = (b as { order: number }).order ?? Infinity;
      //// const orderA = a.type === "movie" ? a.order : Infinity;
      //// const orderB = b.type === "movie" ? b.order : Infinity;
      return orderA - orderB;
    })
    .map((credit) => {
      const { id, media_type, poster_path, ...prop } = credit;

      if ("character" in prop) {
        const { character, ...rest } = prop;

        if ("first_air_date" in rest) {
          const { episode_count, first_air_date, name } = rest;
          const obj: KnownForProps = {
            role: character,
            // episode_count: `${episode_count} Episode${episode_count > 1 ? "s" : ""}`,
            episode_count,
            date: getPrettyDate({ date: first_air_date, style: "year" }),
            title: name,
            poster: {
              src: getImagePathname(poster_path, "poster"),
              href: `/${media_type}/${id}` as Route,
            },
          };
          return obj;
        }

        const { release_date, title } = rest;
        const obj: KnownForProps = {
          role: character,
          date: getPrettyDate({ date: release_date, style: "year" }),
          title,
          poster: {
            src: getImagePathname(poster_path, "poster"),
            href: `/${media_type}/${id}` as Route,
          },
        };
        return obj;
      }

      const { job, ...rest } = prop;
      if ("first_air_date" in rest) {
        const { first_air_date, episode_count, name } = rest;
        const obj: KnownForProps = {
          role: job,
          // episode_count: `${episode_count} Episode${episode_count > 1 ? "s" : ""}`,
          episode_count,
          date: getPrettyDate({ date: first_air_date }),
          title: name,
          poster: {
            src: getImagePathname(poster_path, "poster"),
            href: `/${media_type}/${id}` as Route,
          },
        };
        return obj;
      }

      const { release_date, title } = rest;
      const obj: KnownForProps = {
        role: job,
        date: getPrettyDate({ date: release_date }),
        title,
        poster: {
          src: getImagePathname(poster_path, "poster"),
          href: `/${media_type}/${id}` as Route,
        },
      };
      return obj;
    })
    .slice(0, 4);

  return knownFor;
}
