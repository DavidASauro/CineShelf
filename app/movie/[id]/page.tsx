import { Movie } from "@/types/TMDBMovie";

const BASE_URL = "https://api.themoviedb.org/3/movie";

const headers = {
  Authorization: `Bearer ${process.env.NEXT_TMDB_ACCESS_TOKEN}`,
  accept: "application/json",
};

const MoviePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers,
    next: {
      revalidate: 86400, // 24 hours
    },
  });
  const movie: Movie = await res.json();

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.release_date}</p>
      <p>{movie.overview}</p>
    </div>
  );
};

export default MoviePage;
