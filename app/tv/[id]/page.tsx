import { Season, TvShow } from "@/types/TMDBShow";
import Banner from "@/components/Banner";
import {
  FaCalendarAlt,
  FaClock,
  FaTags,
  FaListOl,
  FaBroadcastTower,
} from "react-icons/fa";
import Image from "next/image";
import TVRatings from "@/components/TVRatings";
import MediaTable from "@/components/MediaTable";

const BASE_URL = "https://api.themoviedb.org/3/tv";
const BASE_IMG_URL = "https://image.tmdb.org/t/p/original/";

const headers = {
  Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  accept: "application/json",
};

const TvPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const [show, recommendations]: [TvShow, TvShow[]] = await Promise.all([
    fetch(`${BASE_URL}/${id}`, {
      headers,
      next: {
        revalidate: 86400, // 24 hours
      },
    }).then((r) => r.json()),
    fetch(`${BASE_URL}/${id}/recommendations`, {
      headers,
      next: {
        revalidate: 86400, // 24 hours
      },
    })
      .then((r) => r.json())
      .then((r) => r.results),
  ]);

  const seasonData: Season[] = (
    await Promise.all(
      show.seasons.map((s) =>
        fetch(
          `https://api.themoviedb.org/3/tv/${id}/season/${s.season_number}`,
          {
            headers,
          },
        ).then((r) => r.json()),
      ),
    )
  ).filter((s) => s.season_number !== 0);

  return (
    <div className="mt-[-15]">
      {/* Banner Photo with Show Title */}
      <Banner imageUrl={BASE_IMG_URL + show.backdrop_path} title={show.name} />
      <div className="flex flex-col container mx-auto p-5 gap-5">
        {/* Movie Poster */}
        <div className="flex flex-col md:flex-row gap-5">
          <div className="hidden md:block relative basis-1/3 lg:basis-1/6 md:min-w-37.5 aspect-2/3 rounded-2xl overflow-hidden shrink-0">
            <Image
              src={BASE_IMG_URL + show.poster_path}
              alt={show.name}
              fill
              sizes="(max-width: 768px) 33vw, 16vw"
              className="object-fill"
              loading="eager"
            />
          </div>
          {/* Movie Description */}
          {/* Release Date, episode count, episode length, Genre Tags, status */}
          <div className="flex flex-col items-center flex-1 bg-card rounded-2xl p-10 gap-5">
            <h2 className="text-2xl text-center">Overview</h2>
            <p className="text-white/75 text-lg text-center">{show.overview}</p>
          </div>
        </div>
        <div className=" flex flex-col bg-card rounded-2xl p-5 gap-5 justify-center">
          <div className="flex flex-wrap justify-center gap-5">
            <div className="bg-secondary rounded-lg p-3 flex flex-col items-center gap-1 w-fit">
              <FaCalendarAlt className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                First air date
              </span>
              <span>{show.first_air_date}</span>
            </div>
            <div className="bg-secondary rounded-lg p-3 flex flex-col items-center gap-1 w-fit">
              <FaListOl className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Number of episodes
              </span>
              <span>{show.number_of_episodes}</span>
            </div>

            <div className="bg-secondary rounded-lg p-3 flex flex-col items-center gap-1 w-fit">
              <FaClock className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Episode length
              </span>
              <span>
                {show.episode_run_time[0] > 0
                  ? `${show.episode_run_time}`
                  : "N/A"}{" "}
                min
              </span>
            </div>

            <div className="bg-secondary rounded-lg p-3 flex flex-col items-center gap-1 w-fit">
              <FaBroadcastTower className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Show status</span>
              <span>{show.status}</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {show.genres.map((genre) => (
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

        {/* Show Ratings */}
        <TVRatings Data={seasonData} />

        {/* Similar Shows */}

        <div className="flex flex-1 flex-col bg-card rounded-2xl p-5">
          <h2 className="text-2xl text-center mb-4">
            Tv Shows Similar to {show.name}
          </h2>
          <MediaTable media={recommendations} type="tv" />
        </div>
      </div>
    </div>
  );
};

export default TvPage;
