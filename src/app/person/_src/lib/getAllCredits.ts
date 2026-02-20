import {
  CombinedCreditsApiResponse,
  MovieCastCreditProps,
  MovieCrewCreditProps,
  TvCastCreditProps,
  TvCrewCreditProps,
} from "@/types/combined-credits";
import {
  ActorRoleCreditProps,
  BaseCreditProps,
  CrewRoleCreditProps,
} from "../types/star-credit-types";
import { getImagePathname, getPrettyDate, getVoteAverage } from "@/lib/utils";
import { Route } from "next";

export default function getAllCredits({
  data,
  knownFor,
}: {
  data: Omit<CombinedCreditsApiResponse, "id">;
  knownFor: string;
}) {
  const casts = getCastingCredit(data.cast);
  const crews = getCrewCredit(data.crew);

  const credits = [...casts, ...crews].sort((a, b) => {
    if (a.department === knownFor) return -1; // a goes before b
    if (b.department === knownFor) return 1; // b goes before a
    return 0; // keep current order
  });

  return credits;
}

function getCastingCredit(casts: (TvCastCreditProps | MovieCastCreditProps)[]) {
  const actingCredits: ActorRoleCreditProps[] = [];
  const castCredit: ActorRoleCreditProps = {
    department: "Acting",
    timePeriod: {
      upcoming: [],
      previous: [],
    },
  };

  const items = casts.reduce((_, cur) => {
    const year =
      "release_date" in cur
        ? getPrettyDate({ date: cur.release_date, style: "year" })
        : getPrettyDate({ date: cur.first_air_date, style: "year" });

    const timePeriod = year ? "previous" : "upcoming";

    const item = {
      id: cur.id,
      title: "title" in cur ? cur.title : cur.name,
      role: cur.character,
      year: year || "",
      voteAverage: getVoteAverage(cur.vote_average),
      mediaType: cur.media_type,
      poster: {
        src: getImagePathname(cur.poster_path, "poster"),
        href: `/${cur.media_type}/${cur.id}` as Route,
      },
      ...("episode_count" in cur && { episodeCount: cur.episode_count }),
    };

    const TIME_PERIOD = timePeriod === "previous" ? "previous" : "upcoming";

    castCredit.timePeriod[TIME_PERIOD].push(item);

    const credits: ActorRoleCreditProps = {
      ...castCredit,
      timePeriod: {
        previous: castCredit.timePeriod.previous.sort(
          (a, b) => Number(b.year) - Number(a.year),
        ),
        upcoming: castCredit.timePeriod.upcoming.sort(
          (a, b) => Number(b.year) - Number(a.year),
        ),
      },
    };

    return credits;
  }, {} as ActorRoleCreditProps);

  actingCredits.push(items);

  return actingCredits;
}

function getCrewCredit(crews: (TvCrewCreditProps | MovieCrewCreditProps)[]) {
  function _credits(data: TvCrewCreditProps | MovieCrewCreditProps) {
    const year =
      "first_air_date" in data
        ? getPrettyDate({ date: data.first_air_date, style: "year" })
        : getPrettyDate({ date: data.release_date, style: "year" });

    const credit: BaseCreditProps = {
      role: data.job,
      poster: {
        href: `/${data.media_type}/${data.id}` as Route,
        src: getImagePathname(data.poster_path, "poster"),
      },
      title: "name" in data ? data.name : data.title,
      year: year || "",
    };

    return credit;
  }

  const groupByRole = Object.groupBy(crews, ({ department }) => department);
  const getRoles = Object.keys(groupByRole);
  const roleInfos: CrewRoleCreditProps[] = getRoles.map((value) => ({
    department: value,
    timePeriod: {
      upcoming: crews
        .filter(
          ({ department, ...prop }) =>
            department === value &&
            (("first_air_date" in prop && prop.first_air_date === "") ||
              ("release_date" in prop && prop.release_date === "")),
        )
        .map((item) => _credits(item))
        .sort((a, b) => Number(b.year) - Number(a.year)),
      previous: crews
        .filter(
          ({ department, ...prop }) =>
            department === value &&
            (("first_air_date" in prop &&
              Boolean(new Date(prop.first_air_date).getFullYear())) ||
              ("release_date" in prop &&
                Boolean(new Date(prop.release_date).getFullYear()))),
        )
        .map((item) => _credits(item))
        .sort((a, b) => Number(b.year) - Number(a.year)),
    },
  }));
  return roleInfos;
}

/**
 * {
 *    department: <string>,
 *    timePeriod: {
 *      upcoming: [...],
 *      previous: [...]
 *    }
 * }
 */
