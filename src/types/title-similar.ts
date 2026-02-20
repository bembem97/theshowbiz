import { MovieProps, TvShowProps } from "./titles";

export interface SimilarMovieApiResponse {
  id: number;
  results: MovieProps[];
  total_pages: number;
  total_results: number;
}

export interface SimilarTvShowApiResponse {
  id: number;
  results: TvShowProps[];
  total_pages: number;
  total_results: number;
}
