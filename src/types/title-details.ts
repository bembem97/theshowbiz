import { GenreProps } from "./genres";

interface ProductionCompanyProps {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountryProps {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguageProps {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface BelongsToCollectionProps {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

interface MovieDetailsProps {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: BelongsToCollectionProps | null;
  budget: number;
  genres: GenreProps[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompanyProps[];
  production_countries: ProductionCountryProps[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguageProps[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// !
interface CreatorProps {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string | null;
}

interface EpisodeProps {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: "standard" | "finale" | string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string | null;
}

interface TvNetworkProps {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

// interface ProductionCompanyProps {
//   id: number;
//   logo_path: string | null;
//   name: string;
//   origin_country: string;
// }

// interface ProductionCountryProps {
//   iso_3166_1: string;
//   name: string;
// }

interface SeasonProps {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

// interface SpokenLanguageProps {
//   english_name: string;
//   iso_639_1: string;
//   name: string;
// }

interface TvDetailsProps {
  adult: boolean;
  backdrop_path: string | null;
  created_by: CreatorProps[];
  episode_run_time: number[];
  first_air_date: string;
  genres: GenreProps[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: EpisodeProps | null;
  name: string;
  next_episode_to_air: EpisodeProps | null;
  networks: TvNetworkProps[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompanyProps[];
  production_countries: ProductionCountryProps[];
  seasons: SeasonProps[];
  spoken_languages: SpokenLanguageProps[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export type {
  TvDetailsProps,
  SeasonProps,
  TvNetworkProps,
  EpisodeProps,
  CreatorProps,
  MovieDetailsProps,
  BelongsToCollectionProps,
  SpokenLanguageProps,
  ProductionCompanyProps,
  ProductionCountryProps,
};
