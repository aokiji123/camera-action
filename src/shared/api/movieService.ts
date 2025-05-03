export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
};

export type Series = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  first_air_date: string;
  genre_ids: number[];
};

export type Genre = {
  id: number;
  name: string;
};

export type FilmType = "film" | "cartoon";
export type SeriesType = "tv" | "anime";

const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c";
const API_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const genreTranslations: Record<string, string> = {
  Action: "Екшн",
  Adventure: "Пригоди",
  Animation: "Мультфільм",
  Comedy: "Комедія",
  Crime: "Кримінал",
  Documentary: "Документальний",
  Drama: "Драма",
  Family: "Сімейний",
  Fantasy: "Фентезі",
  History: "Історичний",
  Horror: "Жахи",
  Music: "Музика",
  Mystery: "Містика",
  Romance: "Романтика",
  "Science Fiction": "Наукова фантастика",
  Thriller: "Трилер",
  War: "Військовий",
  Western: "Вестерн",
};

const ANIMATION_GENRE_ID = 16;

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

export async function getGenres(): Promise<Genre[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch genres");
    }

    const data = await response.json();
    const translatedGenres = (data.genres as Genre[]).map((genre) => ({
      ...genre,
      name: genreTranslations[genre.name] || genre.name,
    }));
    return translatedGenres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
}

export async function getMoviesByGenre(genreId: string): Promise<Movie[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies by genre");
    }

    const data = await response.json();
    return data.results as Movie[];
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return [];
  }
}

export async function searchMovies(query: string): Promise<Movie[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}`
    );

    if (!response.ok) {
      throw new Error("Failed to search movies");
    }

    const data = await response.json();
    return data.results as Movie[];
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
}

export async function getMoviesByYear(year: string): Promise<Movie[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_year=${year}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies by year");
    }

    const data = await response.json();
    return data.results as Movie[];
  } catch (error) {
    console.error("Error fetching movies by year:", error);
    return [];
  }
}

export async function getFilteredMovies(options: {
  genre?: string;
  year?: string;
  filmType?: FilmType;
}): Promise<Movie[]> {
  try {
    const { genre, year, filmType } = options;
    let url = `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;

    if (genre) {
      url += `&with_genres=${genre}`;
    }

    if (year) {
      url += `&primary_release_year=${year}`;
    }

    if (filmType === "cartoon") {
      url += `&with_genres=${ANIMATION_GENRE_ID}`;
    } else if (filmType === "film") {
      url += `&without_genres=${ANIMATION_GENRE_ID}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch filtered movies");
    }

    const data = await response.json();
    return data.results as Movie[];
  } catch (error) {
    console.error("Error fetching filtered movies:", error);
    return [];
  }
}

export function getImageUrl(path: string): string {
  if (!path) return "";
  return `${IMAGE_BASE_URL}${path}`;
}

export async function getTrendingSeries(): Promise<Series[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/trending/tv/day?api_key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch trending series");
    }

    const data = await response.json();
    return data.results as Series[];
  } catch (error) {
    console.error("Error fetching trending series:", error);
    return [];
  }
}

export async function getSeriesGenres(): Promise<Genre[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/genre/tv/list?api_key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch series genres");
    }

    const data = await response.json();
    const translatedGenres = (data.genres as Genre[]).map((genre) => ({
      ...genre,
      name: genreTranslations[genre.name] || genre.name,
    }));
    return translatedGenres;
  } catch (error) {
    console.error("Error fetching series genres:", error);
    return [];
  }
}

export async function searchSeries(query: string): Promise<Series[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}`
    );

    if (!response.ok) {
      throw new Error("Failed to search series");
    }

    const data = await response.json();
    return data.results as Series[];
  } catch (error) {
    console.error("Error searching series:", error);
    return [];
  }
}

export async function getSeriesByYear(year: string): Promise<Series[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/discover/tv?api_key=${API_KEY}&first_air_date_year=${year}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch series by year");
    }

    const data = await response.json();
    return data.results as Series[];
  } catch (error) {
    console.error("Error fetching series by year:", error);
    return [];
  }
}

export async function getFilteredSeries(options: {
  genre?: string;
  year?: string;
  seriesType?: SeriesType;
}): Promise<Series[]> {
  try {
    const { genre, year, seriesType } = options;
    let url = `${API_BASE_URL}/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc`;

    if (genre) {
      url += `&with_genres=${genre}`;
    }

    if (year) {
      url += `&first_air_date_year=${year}`;
    }

    if (seriesType === "anime") {
      url += `&with_genres=${ANIMATION_GENRE_ID}&with_original_language=ja`;
    } else if (seriesType === "tv") {
      url += `&without_genres=${ANIMATION_GENRE_ID}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch filtered series");
    }

    const data = await response.json();
    return data.results as Series[];
  } catch (error) {
    console.error("Error fetching filtered series:", error);
    return [];
  }
}
