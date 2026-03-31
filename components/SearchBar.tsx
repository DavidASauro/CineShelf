"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useRef } from "react";
import type { SearchResult, SearchResponse } from "@/types/TMDBSearch";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const isOpen = search.trim().length > 0 && results.length > 0;
  0;

  useEffect(() => {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      if (!search.trim()) {
        setResults([]);
        return;
      }

      fetch(`/api/search?query=${encodeURIComponent(search)}`, {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((data: SearchResponse) => {
          setResults(data.results.slice(0, 5));
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            console.error(err);
          }
        });
    }, 300);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setResults([]); // closes dropdown
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSelect = (item: SearchResult) => {
    setSearch("");
    setResults([]);
    router.push(`/${item.media_type}/${item.id}`);
  };

  const getLabel = (item: SearchResult) =>
    item.media_type === "tv" ? item.name : item.title;

  return (
    <div ref={containerRef} className="relative w-96">
      {/* 🔍 Input */}
      <div className="relative w-96">
        <div
          className="
    flex items-center px-3 py-2
    rounded-2xl
    border-2 border-red-500
    bg-background
    shadow-[2px_2px_0_rgba(220,38,38,0.8)]
    hover:shadow-[4px_4px_0_rgba(220,38,38,0.85)]
    transition-shadow duration-150
  "
        >
          <Search className="h-4 w-4 mr-2 text-white" />
          <input
            placeholder="Search movie or tv-show..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
        w-full
        bg-transparent
        outline-none
        placeholder:text-white/50
        text-white
        font-bold
        text-sm
      "
          />
        </div>
      </div>

      {/* 📦 Dropdown */}
      {isOpen && (
        <div
          className="
      absolute top-full mt-2 w-full
      rounded-2xl border-2 border-red-500
      bg-background
      shadow-[4px_4px_0_rgba(220,38,38,0.8)]
      z-1
    "
        >
          <Command shouldFilter={false}>
            <CommandList>
              {results.length === 0 ? (
                <CommandEmpty className="text-red-300 font-bold">
                  No results found.
                </CommandEmpty>
              ) : (
                <CommandGroup>
                  {results.map((item, index) => (
                    <div
                      key={item.id}
                      className={index !== 0 ? "border-t border-red-500" : ""}
                    >
                      <CommandItem
                        value={String(item.id)}
                        onSelect={() => handleSelect(item)}
                        className="
                      cursor-pointer
                      text-white font-bold
                      hover:bg-red-500/20
                    "
                      >
                        {getLabel(item)}
                        <span className="ml-auto text-xs text-red-300 capitalize">
                          {item.media_type}
                        </span>
                      </CommandItem>
                    </div>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
