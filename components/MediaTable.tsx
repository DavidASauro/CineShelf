import { TvShow } from "@/types/TMDBShow";
import { Movie } from "../types/TMDBMovie";
import MediaCard from "./MediaCard";
import Link from "next/link";

type MediaProps = {
  media: Movie[] | TvShow[];
  type?: "movie" | "tvshow";
};

const MediaTable = ({ media, type = "movie" }: MediaProps) => {
  return (
    <div className="grid grid-cols-auto-fill max-w-7xl mx-auto w-full gap-2 justify-items-center">
      {media.map((item) => (
        <Link
          key={item.id}
          href={`/${type}/${item.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MediaCard
            picture={`https://image.tmdb.org/t/p/original${item.poster_path}`}
            title={"title" in item ? item.title : item.name}
          />
        </Link>
      ))}
    </div>
  );
};

export default MediaTable;
