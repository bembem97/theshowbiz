export interface CountryRatingProps {
  descriptors: string[];
  iso_3166_1: string;
  rating: string;
}

export interface ContentRatingsApiResponse {
  id: number;
  results: CountryRatingProps[];
}
