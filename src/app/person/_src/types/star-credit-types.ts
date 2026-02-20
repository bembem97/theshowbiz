import { CastCreditProps, CrewCreditProps } from "@/types/combined-credits";
import { StarDetailsApiResponse } from "@/types/star-details";
import { ProfileProps } from "@/types/star-profile-image";
import { Route } from "next";

export interface StarDetailsProps extends StarDetailsApiResponse {
  combined_credits: {
    cast: CastCreditProps[];
    crew: CrewCreditProps[];
  };
  images: {
    profiles: ProfileProps[]
  }
}

export interface KnownForProps {
  role: string;
  episode_count?: number;
  date: string | null;
  title: string;
  poster: {
    href: Route;
    src: string;
  };
}

/**
 * Identity Props
 * Titles which he/she is known for
 */

export type IdentityProps = {
  name: string;
  lifetime: {
    birthdate: string | null;
    deceased: string | null;
    birthPlace: string;
  };
  id: number;
  profile: {
    href: Route;
    src: string;
  };
  bio: string;
  knownForDept: string;
};

/**
 * All Credit Prop-types
 */
export type ActorRoleCreditProps = {
  department: string;
  timePeriod: {
    upcoming: BaseCreditProps[];
    previous: BaseCreditProps[];
  };
};

export type CrewRoleCreditProps = {
  department: string;
  timePeriod: {
    upcoming: BaseCreditProps[];
    previous: BaseCreditProps[];
  };
};

export interface BaseCreditProps {
  title: string;
  year: number | string;
  poster: { src: string; href: Route };
  episodeCount?: number;
  role: string;
}
// export interface AsActorCreditProps extends BaseCreditProps {
//   character?: string;
// }

// export interface AsCrewCreditProps extends BaseCreditProps {
//   job?: string;
// }
