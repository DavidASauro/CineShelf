import type { Movie } from "./TMDBMovie";

export type TMDBApiResponseType = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
