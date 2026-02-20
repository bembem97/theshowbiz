// todo: Cast prop-types
interface BaseCastCreditProps {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  media_type: "movie" | "tv";
}

export interface TvCastCreditProps extends BaseCastCreditProps {
  media_type: "tv";
  origin_country: string[];
  original_name: string;
  first_air_date: string;
  name: string;
  episode_count: number;
  first_credit_air_date: string;
}

export interface MovieCastCreditProps extends BaseCastCreditProps {
  media_type: "movie";
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
  order: number;
}

export type CastCreditProps = TvCastCreditProps | MovieCastCreditProps;

// todo: Crew Props
export interface BaseCrewCreditProps {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  credit_id: string;
  department: string;
  job: string;
  media_type: "movie" | "tv";
}

export interface MovieCrewCreditProps extends BaseCrewCreditProps {
  media_type: "movie";
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
}

export interface TvCrewCreditProps extends BaseCrewCreditProps {
  media_type: "tv";
  origin_country: string[];
  original_name: string;
  first_air_date: string;
  name: string;
  episode_count: number;
  first_credit_air_date: string;
}

export type CrewCreditProps = TvCrewCreditProps | MovieCrewCreditProps;

// todo: Api Response
export interface CombinedCreditsApiResponse {
  cast: CastCreditProps[];
  crew: CrewCreditProps[];
  id: number;
}
