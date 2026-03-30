import { OMDB, RatingSource } from "@/types/OMDBApiResponse";

export const getRating = (omdb: OMDB, source: RatingSource) => {
  return omdb.Ratings.find((r) => r.Source === source);
};
