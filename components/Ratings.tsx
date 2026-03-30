"use client";

import { OMDB } from "@/types/OMDBApiResponse";
import { getRating } from "@/utils/GetRating";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

interface RatingsProps {
  OMDBResponse: OMDB;
}

const Ratings = ({ OMDBResponse }: RatingsProps) => {
  const imdb = getRating(OMDBResponse, "Internet Movie Database");
  const rt = getRating(OMDBResponse, "Rotten Tomatoes");
  const meta = getRating(OMDBResponse, "Metacritic");
  return (
    <div>
      {imdb || rt || meta ? (
        <div className="flex flex-wrap bg-card rounded-2xl p-5 gap-5 justify-center">
          {imdb && (
            <div className="bg-secondary rounded-2xl p-5 flex flex-col items-center w-fit">
              <div className="relative w-40 h-25">
                <Image
                  src={"/IMDB_Logo_2016.svg"}
                  alt="IMDB Logo"
                  fill
                  sizes="150px"
                  className="object-contain"
                />
              </div>
              <div className="flex items-center gap-1 mt-2">
                <FaStar className="text-yellow-400 text-xl" />
                <span className="font-bold text-2xl">
                  {imdb.Value.split("/")[0]}
                </span>
                <span className="text-muted-foreground text-xl">/10</span>
              </div>
            </div>
          )}

          {rt && (
            <div className="bg-secondary rounded-2xl p-5 flex flex-col items-center w-fit">
              <div className="relative w-40 h-25">
                <Image
                  src={"/Rotten_Tomatoes_logo.svg"}
                  alt="Rotten Tomatoes Logo"
                  fill
                  sizes="150px"
                  className="object-contain"
                />
              </div>
              {(() => {
                const score = parseInt(rt.Value);
                const isFresh = score >= 60;
                return (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="relative w-8 h-8">
                      <Image
                        src={isFresh ? "/rt-fresh.svg" : "/rt-splat.svg"}
                        alt={isFresh ? "Fresh" : "Rotten"}
                        fill
                        sizes="32px"
                        className="object-contain"
                      />
                    </div>
                    <span className={`font-bold text-2xl `}>{rt.Value}</span>
                  </div>
                );
              })()}
            </div>
          )}

          {meta && (
            <div className="bg-secondary rounded-2xl p-5 flex flex-col items-center w-fit">
              <div className="relative w-40 h-25">
                <Image
                  src={"/Metacritic_logo.svg"}
                  alt="Metacritic Logo"
                  fill
                  sizes="150px"
                  className="object-contain"
                />
              </div>

              {(() => {
                const score = parseInt(meta.Value);
                const color =
                  score >= 61
                    ? "bg-green-500"
                    : score >= 40
                      ? "bg-yellow-500"
                      : "bg-red-500";
                return (
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`${color} text-white font-bold text-2xl px-3 py-1 rounded`}
                    >
                      {score}
                    </span>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Ratings;
