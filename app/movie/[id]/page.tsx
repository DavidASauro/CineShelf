import Banner from "@/components/Banner";
import MediaTable from "@/components/MediaTable";
import Ratings from "@/components/Ratings";
import { OMDB } from "@/types/OMDBApiResponse";
import { Movie } from "@/types/TMDBMovie";
import Image from "next/image";
import {
  FaCalendarAlt,
  FaClock,
  FaTags,
  FaMoneyBillWave,
  FaChartLine,
} from "react-icons/fa";

const BASE_URL = "https://api.themoviedb.org/3/movie";
const BASE_IMG_URL = "https://image.tmdb.org/t/p/original/";

const headers = {
  Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  accept: "application/json",
};

const MoviePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const [movie, recommendations]: [Movie, Movie[]] = await Promise.all([
    fetch(`${BASE_URL}/${id}`, {
      headers,
      next: {
        revalidate: 86400, // 24 hours
      },
    }).then((r) => r.json()),
    fetch(`${BASE_URL}/${id}/recommendations`, {
      headers,
      next: {
        revalidate: 86400,
      },
    })
      .then((r) => r.json())
      .then((r) => r.results),
  ]);

  const omdbResponse = await fetch(
    `https://www.omdbapi.com/?apikey=${process.env.OMDB_APIKEY}&i=${movie.imdb_id}`,
    { next: { revalidate: 86400 } },
  );

  const omdb: OMDB = await omdbResponse.json();

  return (
    <div className="mt-[-15]">
      {/* Banner Photo with Movie Title */}
      <Banner
        imageUrl={BASE_IMG_URL + movie.backdrop_path}
        title={movie.title}
      />
      <div className="flex flex-col container mx-auto p-5 gap-5">
        {/* Movie Poster */}
        <div className="flex flex-col md:flex-row gap-5">
          <div className="hidden md:block relative basis-1/3 lg:basis-1/6 md:min-w-37.5 aspect-2/3 rounded-2xl overflow-hidden shrink-0">
            <Image
              src={BASE_IMG_URL + movie.poster_path}
              alt={movie.title}
              fill
              sizes="(max-width: 768px) 33vw, 16vw"
              className="object-fill"
              loading="eager"
            />
          </div>
          {/* Movie Description */}
          {/* Release Date, Run Time, Genre Tags, Budget, Revenue  */}
          <div className="flex flex-col items-center flex-1 bg-card rounded-2xl p-10 gap-5">
            <h2 className="text-2xl">Overview</h2>
            <p className="text-white/75 text-lg text-center">
              {movie.overview}
            </p>
          </div>
        </div>
        <div className=" flex flex-col bg-card rounded-2xl p-5 gap-5 justify-center">
          <div className="flex flex-wrap justify-center gap-5">
            <div className="bg-secondary rounded-lg p-3 flex flex-col items-center gap-1 w-fit">
              <FaCalendarAlt className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Release Date
              </span>
              <span>{movie.release_date}</span>
            </div>

            <div className="bg-secondary rounded-lg p-3 flex flex-col items-center gap-1 w-fit">
              <FaClock className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Runtime</span>
              <span>{movie.runtime} min</span>
            </div>

            <div className="bg-secondary rounded-lg p-3 flex flex-col items-center gap-1 w-fit">
              <FaMoneyBillWave className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Budget</span>
              <span>${movie.budget.toLocaleString()}</span>
            </div>

            <div className="bg-secondary rounded-lg p-3 flex flex-col items-center gap-1 w-fit">
              <FaChartLine className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Revenue</span>
              <span>${movie.revenue.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {movie.genres.map((genre) => (
              <span
                className="flex bg-secondary rounded-lg px-3 py-1 text-sm gap-2"
                key={genre.id}
              >
                {genre.name}
                <FaTags className="text-muted-foreground self-center" />
              </span>
            ))}
          </div>
        </div>

        {/* Movie Ratings */}
        <Ratings OMDBResponse={omdb} />

        {/* Similar Movies */}
        <div className="flex flex-col flex-1 bg-card rounded-2xl p-5">
          <h2 className="text-2xl text-center mb-4">
            Movies Similar to {movie.title}
          </h2>
          <MediaTable media={recommendations} />
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
