const BASE_URL =
  "https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=vote_count.desc&with_original_language=en&region=US";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const genres = searchParams.get("with_genres") ?? "";
  const page = searchParams.get("page") ?? "1";

  const genreParam = genres ? `&with_genres=${genres}` : "";

  const res = await fetch(
    `${BASE_URL}&page=${page}&primary_release_date.gte=${from}-01-01&primary_release_date.lte=${to}-12-31${genreParam}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
      next: {
        revalidate: 86400, // 24 hours
      },
    },
  );
  const data = await res.json();
  return Response.json(data);
}
