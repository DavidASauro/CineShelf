import type {
  TMDBMovieResponseType,
  TMDBTvShowResponseType,
} from "@/types/TMDBApiResponse";
import MediaTable from "../components/MediaTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const headers = {
  Authorization: `Bearer ${process.env.NEXT_TMDB_ACCESS_TOKEN}`,
  accept: "application/json",
};

export default async function Home() {
  const [trendingMovies, trendingShows]: [
    TMDBMovieResponseType,
    TMDBTvShowResponseType,
  ] = await Promise.all([
    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      { headers },
    ).then((res) => res.json()),
    fetch("https://api.themoviedb.org/3/trending/tv/day", { headers }).then(
      (res) => res.json(),
    ),
  ]);

  return (
    <div>
      <h1 className="text-center">CineShelf</h1>
      <div className="flex flex-1 flex-row justify-center gap-1">
        <Link href="/findmovie">
          <Button>Find a Movie</Button>
        </Link>
        <Link href="/findshow">
          <Button>Find a Show</Button>
        </Link>
      </div>

      <section className="flex flex-col flex-1 justify-center p-10">
        <h1 className="text-center">Trending Movies</h1>
        <MediaTable media={trendingMovies.results} />
      </section>
      <section className="flex flex-col flex-1 justify-center p-10">
        <h1 className="text-center">Trending Shows</h1>
        <MediaTable media={trendingShows.results} />
      </section>
    </div>
  );
}
