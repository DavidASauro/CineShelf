import { TvShow } from "@/types/TMDBShow";
import { Movie } from "../types/TMDBMovie";
import MediaCard from "./MediaCard";
import Link from "next/link";

type MediaProps = {
  media: Movie[] | TvShow[];
  type?: "movie" | "tv";
};

const MediaTable = ({ media, type = "movie" }: MediaProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {media.map((item) => (
        <Link key={item.id} href={`/${type}/${item.id}`}>
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
