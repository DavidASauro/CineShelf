import { Movie } from "../types/TMDBMovie";

type MovieProps = {
  movies: Movie[];
};

const MovieTable = ({ movies }: MovieProps) => {
  return (
    <div className="grid grid-cols-3">
      {movies.map((movie) => (
        <div key={movie.id}>
          {movie.title}
          <br />
          {movie.release_date}
        </div>
      ))}
    </div>
  );
};

export default MovieTable;
