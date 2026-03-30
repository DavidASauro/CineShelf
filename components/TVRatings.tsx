import { Season } from "@/types/TMDBShow";

interface TVRatingsProps {
  Data: Season[];
}

const getRatingColor = (rating: number) => {
  if (rating >= 9) return "bg-green-500";
  if (rating >= 8) return "bg-green-400";
  if (rating >= 7) return "bg-yellow-400";
  if (rating >= 6) return "bg-orange-400";
  if (rating >= 5) return "bg-red-400";
  return "bg-red-600";
};

const TVRatings = ({ Data }: TVRatingsProps) => {
  return (
    <div className="bg-card rounded-2xl p-5">
      <h2 className="text-2xl text-center mb-4">Episode Ratings</h2>
      <div className=" flex flex-col gap-3 pr-2">
        {Data.map((season) => (
          <div
            key={season.season_number}
            className="bg-secondary rounded-xl p-3"
          >
            <span className="text-sm font-semibold text-muted-foreground mb-2 block">
              Season {season.season_number}
            </span>
            <div className="flex gap-1 flex-wrap">
              {season.episodes
                .filter((ep) => ep.vote_average > 0)
                .map((ep) => (
                  <div key={ep.id} className="flex flex-col items-center gap-1">
                    <div
                      className={`w-8 h-8 rounded ${getRatingColor(ep.vote_average)} flex items-center justify-center text-xs font-bold text-black`}
                      title={`S${season.season_number}E${ep.episode_number}: ${ep.name} — ${ep.vote_average}`}
                    >
                      {ep.vote_average.toFixed(1)}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      E{ep.episode_number}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TVRatings;
