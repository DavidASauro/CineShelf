export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genres: GenreObject[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  budget: number;
  imdb_id: string;
  runtime: number;
  revenue: number;
}

interface GenreObject {
  id: number;
  name: string;
}
