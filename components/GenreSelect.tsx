"use client";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

const MOVIE_GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
  { id: 36, name: "History" },
];

const TV_GENRES = [
  { id: 10759, name: "Action & Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 10762, name: "Kids" },
  { id: 9648, name: "Mystery" },
  { id: 10763, name: "News" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
  { id: 10768, name: "War & Politics" },
  { id: 37, name: "Western" },
];

export { MOVIE_GENRES, TV_GENRES };
type Genre = { id: number; name: string };

const GenreSelect = ({
  onChange,
  genres = MOVIE_GENRES,
}: {
  onChange?: (genres: string[]) => void;
  genres?: Genre[];
}) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  return (
    <ToggleGroup
      variant="outline"
      multiple
      spacing={2}
      className="flex-wrap justify-center mt-5 mb-5"
      onValueChange={(value) => {
        setSelectedGenres(value);
        onChange?.(value);
      }}
    >
      {genres.map((genre) => (
        <ToggleGroupItem key={genre.id} value={genre.id.toString()}>
          {genre.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default GenreSelect;
