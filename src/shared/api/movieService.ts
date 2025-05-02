export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
};

const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c";
const API_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export async function getTrendingMovies(): Promise<Movie[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/trending/movie/day?api_key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch trending movies");
    }

    const data = await response.json();
    return data.results as Movie[];
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
}

export function getImageUrl(path: string): string {
  if (!path) return "";
  return `${IMAGE_BASE_URL}${path}`;
}
