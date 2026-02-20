import { StarProps } from "./stars"
import { MovieProps, TvShowProps } from "./titles"

//todo: Movies
export interface MovieMediaProps extends MovieProps {
    media_type: "movie"
}

export interface MovieMediaApiResponse {
    page: number
    results: MovieMediaProps[]
    total_pages: number
    total_results: number
}

//todo: Tv Shows
export interface TvMediaProps extends TvShowProps {
    media_type: "tv"
}

export interface TvMediaApiResponse {
    page: number
    results: TvMediaProps[]
    total_pages: number
    total_results: number
}

//todo: Celebrities
export interface StarMediaProps extends StarProps {
    media_type: "person"
}

export interface StarMediaApiResponse {
    page: number
    results: StarMediaProps[]
    total_pages: number
    total_results: number
}

//todo: Entertainment Media Api Response
export interface ShowbizApiResponse {
    page: number
    results: (MovieMediaProps | TvMediaProps | StarMediaProps)[]
    total_pages: number
    total_results: number
}
