import { TvShow } from "@/types/TMDBShow";

const BASE_URL = "https://api.themoviedb.org/3/tv";

const headers = {
  Authorization: `Bearer ${process.env.NEXT_TMDB_ACCESS_TOKEN}`,
  accept: "application/json",
};

const TvPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers,
    next: {
      revalidate: 86400, // 24 hours
    },
  });
  const show: TvShow = await res.json();

  return (
    <div>
      <h1>{show.name}</h1>
      <p>{show.first_air_date}</p>
      <p>{show.overview}</p>
    </div>
  );
};

export default TvPage;
