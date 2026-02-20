/**
 //* VideoProps represents the properties of a media video.
 //* It includes information about the video's language, key, site, size, type, and publication date.
 */
export interface VideoProps {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: VideoTypeProps;
  official: boolean;
  published_at: string; // ISO 8601 format string
  id: string;
}

export type VideoTypeProps =
  | "Trailer"
  | "Teaser"
  | "Clip"
  | "Featurette"
  | "Opening Credits"
  | "Behind the Scenes"
  | "Bloopers"
  | string; // To handle any future or unexpected types

export interface VideosApiResponse {
  id: number;
  results: VideoProps[];
}

/**
 //* ImageProps represents the properties of a media image.
 //* It includes information about the image's aspect ratio, dimensions, language, file path, and voting details.
 */
export interface ImageProps {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface ImagesApiResponse {
  id: number;
  backdrops: ImageProps[];
  logos: ImageProps[];
  posters: ImageProps[];
}
