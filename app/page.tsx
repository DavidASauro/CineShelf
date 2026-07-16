import type {
  TMDBMovieResponseType,
  TMDBTvShowResponseType,
} from "@/types/TMDBApiResponse";
import MediaTable from "../components/MediaTable";
import SearchBar from "@/components/SearchBar";

const headers = {
  Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  accept: "application/json",
};

export default async function Home() {
  const [trendingMovies, trendingShows]: [
    TMDBMovieResponseType,
    TMDBTvShowResponseType,
  ] = await Promise.all([
    fetch("https://api.themoviedb.org/3/movie/popular", {
      headers,
      next: { revalidate: 86400 },
    }).then((res) => res.json()),
    fetch("https://api.themoviedb.org/3/trending/tv/week", {
      headers,
      next: { revalidate: 86400 },
    }).then((res) => res.json()),
  ]);

  return (
    <div className="flex flex-col flex-1 mx-auto items-center gap-5">
      <SearchBar />
      <section className="flex flex-col flex-1 justify-center">
        <h2 className="text-2xl text-center mb-4">Trending Movies</h2>
        <MediaTable media={trendingMovies.results} />
      </section>
      <section className="flex flex-col flex-1 justify-center p-10">
        <h2 className="text-2xl text-center mb-4">Trending Shows</h2>
        <MediaTable media={trendingShows.results} type="tv" />
      </section>
    </div>
  );
}
