export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY:
    process.env.EXPO_PUBLIC_API_KEY ||
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGY0N2RjODVhMjhlMTNkYTgzNzNjMTUyYjBjYWM2ZiIsIm5iZiI6MTc0NDI3MTg4Ni45ODcsInN1YiI6IjY3Zjc3YTBlZDNhYjdkN2E4YmFkMzk3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.__x117c30c1xFJHw4nVih0qafdyGpR0J65TbZIiXkQY",
  Headers: {
    accept: "application/json",
    Authorization: `Bearer ${
      process.env.EXPO_PUBLIC_API_KEY ||
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGY0N2RjODVhMjhlMTNkYTgzNzNjMTUyYjBjYWM2ZiIsIm5iZiI6MTc0NDI3MTg4Ni45ODcsInN1YiI6IjY3Zjc3YTBlZDNhYjdkN2E4YmFkMzk3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.__x117c30c1xFJHw4nVih0qafdyGpR0J65TbZIiXkQY"
    }`,
  },
};

// /disover/move

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=pouplarity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.Headers,
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json();

  return data.results;
};

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?apiKey=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.Headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    //@ts-ignore
    console.log("error on fetching movie details", error.message);

    throw error;
  }
};
