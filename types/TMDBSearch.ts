// types/search.ts
export type MediaType = "movie" | "tv";

export interface SearchResult {
  id: number;
  media_type: MediaType;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  backdrop_path: string | null;
  poster_path: string | null;

  // Movie-specific
  title?: string;
  original_title?: string;
  overview?: string;
  release_date?: string;
  video?: boolean;

  // TV-specific
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
}

export interface SearchResponse {
  page: number;
  results: SearchResult[];
  total_pages: number;
  total_results: number;
}
