export interface KeywordProps {
  name: string;
  id: number;
}

export interface TvKeywordsApiResponse {
  id: number;
  results: KeywordProps[];
}

export interface MovieKeywordsApiResponse {
  id: number;
  keywords: KeywordProps[];
}
