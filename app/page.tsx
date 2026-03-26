import MovieTable from "./components/MovieTable";
import { TMDBApiResponseType } from "./types/TMDBApiResponse";

export default async function Home() {
  const url =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_TMDB_ACCESS_TOKEN}`,
      accept: "application/json",
    },
  });
  const movieData: TMDBApiResponseType = await res.json();
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>
        <h1 className="text-center">CineShelf</h1>
        <MovieTable movies={movieData.results} />
      </main>
    </div>
  );
}
