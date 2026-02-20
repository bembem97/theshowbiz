import { TrailerProps } from "@/module/gallery/types";
import {
  AggregateCastProps,
  AggregateCrewProps,
} from "@/types/aggregrate-credits";
import { CountryRatingProps } from "@/types/content-ratings";
import { CastMemberProps, CrewMemberProps } from "@/types/credits";
import { ImageProps, VideoProps } from "@/types/galleries";
import { GenreProps } from "@/types/genres";
import { KeywordProps } from "@/types/keywords";
import { CountryReleaseDatesProps } from "@/types/release-dates";
import {
  MovieDetailsProps,
  ProductionCompanyProps,
  ProductionCountryProps,
  SpokenLanguageProps,
  TvDetailsProps,
  TvNetworkProps,
} from "@/types/title-details";
import { TvShowProps } from "@/types/titles";

/**
 * TMPDB API Prop Types
 */
export interface ApiTvDetailsProps extends TvDetailsProps {
  aggregate_credits: {
    cast: AggregateCastProps[];
    crew: AggregateCrewProps[];
  };
  content_ratings: {
    results: CountryRatingProps[];
  };
  videos: {
    results: VideoProps[];
  };
  images: {
    backdrops: ImageProps[];
    posters: ImageProps[];
    logos: ImageProps[];
  };
  keywords: {
    results: KeywordProps[];
  };
  similar: {
    id: number;
    results: TvShowProps[];
    total_pages: number;
    total_results: number;
  };
}

export interface ApiMovieDetailsProps extends MovieDetailsProps {
  release_dates: {
    results: CountryReleaseDatesProps[];
  };
  credits: {
    cast: CastMemberProps[];
    crew: CrewMemberProps[];
  };
  videos: {
    results: VideoProps[];
  };
  images: {
    backdrops: ImageProps[];
    posters: ImageProps[];
    logos: ImageProps[];
  };
  keywords: {
    keywords: KeywordProps[];
  };
  similar: {
    page: number;
    results: TvShowProps[];
    total_pages: number;
    total_results: number;
  };
}

/**
 * Title Details General Prop Types
 */
export interface MainDetailsProps {
  backdrop_path: string;
  certification: string | undefined;
  directors: { id: number; name: string }[]; /** crew.directors or creators */
  casts: { id: number; name: string }[];
  genres: GenreProps[];
  id: number;
  overview: string;
  poster_path: string;
  date: string | null;
  tagline: string;
  title: string;
  trailer: TrailerProps;
  vote_average: string;
  vote_count: number;
  pathname: string | null;
}

export interface BaseMetadataProps {
  date: string | null;
  id: number;
  original_language: string;
  production_companies: (Omit<ProductionCompanyProps, "logo_path"> & {
    logo_path: string;
  })[];
  production_countries: ProductionCountryProps[];
  spoken_languages: SpokenLanguageProps[];
  status: string;
}

/**
 * Tv Show Prop Types
 */

export interface EpisodeDetailsProps {
  air_date: string;
  episode_number: number;
  name: string;
  overview: string;
  runtime: string;
  season_number: number;
  vote_average: number;
  vote_count: string;
}

export interface SeasonDetailsProps {
  air_date: string | null;
  episode_count: number;
  name: string;
  id: number;
  overview: string;
  season_number: number;
  vote_average: number;
}

export interface ShowDetailsProps extends MainDetailsProps {
  season_range: string;
  media_type: "tv";
}

export interface ShowMetadataProps extends BaseMetadataProps {
  networks: (Omit<TvNetworkProps, "logo_path" | "origin_country"> & {
    logo_path: string;
  })[];
  total_seasons: string;
  total_episodes: string;
  type: string;
  media_type: "tv";
}

/**
 * Movie Prop Types
 */
export interface FilmDetailsProps extends MainDetailsProps {
  runtime: string;
  media_type: "movie";
}

export interface MovieMetadataProps extends BaseMetadataProps {
  budget: string;
  revenue: string;
  media_type: "movie";
}
