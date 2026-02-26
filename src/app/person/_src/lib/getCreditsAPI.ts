import { API_KEY, API_URL } from "@/lib/constant";
import { extFetch } from "@/lib/fetch";
import { getImagePathname, getPrettyDate } from "@/lib/utils";
import { IdentityProps, StarDetailsProps } from "../types/star-credit-types";
import getKnownFor from "./getKnownFor";
import { Route } from "next";

export default async function getCreditsAPI(starId: string) {
  const r = await extFetch<StarDetailsProps>(
    `${API_URL}person/${starId}?language=en-US&api_key=${API_KEY}&append_to_response=combined_credits,images`,
  );

  const identity: IdentityProps = {
    name: r.name,
    lifetime: {
      birthdate: getPrettyDate({ date: r.birthday }),
      deceased: getPrettyDate({ date: r.deathday }),
      birthPlace: r.place_of_birth,
    },
    id: r.id,
    profile: {
      src: getImagePathname(r.profile_path, "poster"),
      href: `/person/${r.id}/profile${r.profile_path || ""}` as Route,
    },
    bio: r.biography,
    knownForDept: r.known_for_department,
  };

  const knownFor = getKnownFor([
    ...r.combined_credits.cast,
    ...r.combined_credits.crew,
  ]);

  return { identity, knownFor, images: r.images.profiles };
}
