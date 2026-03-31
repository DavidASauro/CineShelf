"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { SearchResult, SearchResponse } from "@/types/TMDBSearch";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!search.trim()) {
        setResults([]);
        return;
      }
      fetch(`/api/search?query=${encodeURIComponent(search)}`)
        .then((res) => res.json())
        .then((data: SearchResponse) => setResults(data.results));
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  const handleSelect = (item: SearchResult) => {
    setResults([]);
    setSearch("");
    router.push(`/${item.media_type}/${item.id}`);
  };

  const getLabel = (item: SearchResult) =>
    item.media_type === "tv" ? item.name : item.title;

  return (
    <div className="relative w-96">
      <input
        type="text"
        placeholder="Search movie or tv-show..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded bg-secondary/25"
      />
      {results.length > 0 && (
        <div className="absolute bg-secondary/95 border w-full mt-1 rounded shadow z-10">
          {results.slice(0, 5).map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item)}
              className="p-2 hover:bg-gray-100 cursor-pointer text-white"
            >
              {getLabel(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
