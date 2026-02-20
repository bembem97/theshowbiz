export interface ProfileProps {
  aspect_ratio: number;
  height: number;
  iso_639_1: null | string;
  file_path: null | string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface ProfileApiResponse {
  id: number;
  profiles: ProfileProps[];
}
