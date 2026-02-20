export interface ReviewApiResponse {
  id: number;
  page: number;
  results: ReviewProps[];
  total_pages: number;
  total_results: number;
}

export interface ReviewProps {
  author: string;
  author_details: AuthorDetailsProps;
  content: string;
  created_at: string; // ISO timestamp
  id: string;
  updated_at: string; // ISO timestamp
  url: string;
}

export interface AuthorDetailsProps {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number | null;
}
