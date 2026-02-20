//todo: Base prop-types
export interface ProductionCompanyProps {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface BaseTitleProps {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  poster_path: string | null;
  popularity: number;
  vote_average: number;
  vote_count: number;
}

//todo: Movies
export interface MovieProps extends BaseTitleProps {
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
}

export interface MovieApiResponse {
  page: number;
  results: MovieProps[];
  total_pages: number;
  total_results: number;
}

//todo: Tv Shows
export interface TvShowProps extends BaseTitleProps {
  first_air_date: string;
  name: string;
  origin_country: string[];
  original_name: string;
}

export interface TvShowApiResponse {
  page: number;
  results: TvShowProps[];
  total_pages: number;
  total_results: number;
}
