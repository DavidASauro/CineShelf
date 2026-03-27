"use client";
import { useState } from "react";
import YearRangeSlider from "@/components/YearRangeSlider";
import type { Movie } from "@/types/TMDBMovie";
import { TMDBMovieResponseType } from "@/types/TMDBApiResponse";
import MediaTable from "./MediaTable";
import GenreSelect, { MOVIE_GENRES } from "./GenreSelect";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

const MovieFilters = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [yearRange, setYearRange] = useState({
    from: 1900,
    to: new Date().getFullYear(),
  });
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (
    from: number,
    to: number,
    selectedGenres: string[],
    currentPage: number,
  ) => {
    setLoading(true);
    const genreParam =
      selectedGenres.length > 0
        ? `&with_genres=${selectedGenres.join(",")}`
        : "";
    const res = await fetch(
      `/api/movies?from=${from}&to=${to}&page=${currentPage}${genreParam}`,
    );
    const data: TMDBMovieResponseType = await res.json();
    setMovies(data.results);
    setLoading(false);
    setTotalPages(data.total_pages);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchMovies(yearRange.from, yearRange.to, genres, newPage);
  };
  return (
    <div>
      <section className="flex flex-col items-center w-full max-w-5xl mx-auto">
        <YearRangeSlider
          onChange={({ from, to }) => {
            setYearRange({ from, to });
            setPage(1);
            fetchMovies(from, to, genres, 1);
          }}
        />

        <GenreSelect
          genres={MOVIE_GENRES}
          onChange={(selectedGenres) => {
            setGenres(selectedGenres);
            setPage(1);
            fetchMovies(yearRange.from, yearRange.to, selectedGenres, 1);
          }}
        />
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(page - 1)}
                aria-disabled={page <= 1}
                className={
                  page <= 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
            <PaginationItem>
              <span className="text-sm px-4">
                Page {page} of {totalPages}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(page + 1)}
                aria-disabled={page >= totalPages}
                className={
                  page >= totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
      <section className="max-w-4xl mx-auto w-full mt-5">
        {loading ? (
          <p className="text-center align-middle">Loading...</p>
        ) : (
          <MediaTable media={movies} type="movie" />
        )}
      </section>
    </div>
  );
};

export default MovieFilters;
