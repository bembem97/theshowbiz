export interface ReleaseDatesApiResponse {
  id: number;
  results: CountryReleaseDatesProps[];
}

export interface CountryReleaseDatesProps {
  iso_3166_1: string; // ISO 3166-1 alpha-2 country code
  release_dates: ReleaseDateDetailProps[];
}

export interface ReleaseDateDetailProps {
  certification: string; // Age rating or classification, e.g., "PG-13"
  descriptors: string[]; // Content descriptors like "Violence"
  iso_639_1: string; // ISO 639-1 language code, often empty
  note: string; // Additional notes, such as theater info
  release_date: string; // ISO 8601 date format (UTC datetime)
  type: number; // Release type (1 = Premiere, 3 = Theatrical, etc.)
}
