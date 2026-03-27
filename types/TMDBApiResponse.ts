import type { Movie } from "./TMDBMovie";
import { TvShow } from "./TMDBShow";

export type TMDBMovieResponseType = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type TMDBTvShowResponseType = {
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
};
