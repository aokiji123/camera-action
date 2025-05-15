export type Movie = {
  id: string;
  name: string;
  title?: string;
  slug: string;
  description: string;
  image_name: string;
  poster_path?: string;
  poster: string;
  kind: string;
  status: string;
  release_year: string;
  imdb_score: number;
  aliases: string[];
  countries: string[];
  average_rating: number;
  main_genre: string | null;
  episodes_count?: number;
  release_date?: string;
  studio: {
    id: string;
    name: string;
    slug: string;
  } | null;
};

export type PaginatedResponse<T> = {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
};

export type MovieKind =
  | "movie"
  | "tv_series"
  | "animated_movie"
  | "animated_series";
export type MovieStatus =
  | "anons"
  | "ongoing"
  | "released"
  | "canceled"
  | "rumored";
export type SortField =
  | "name"
  | "created_at"
  | "imdb_score"
  | "first_air_date"
  | "duration"
  | "episodes_count";
export type SortDirection = "asc" | "desc";

export type Genre = {
  id: number;
  name: string;
};

export type FilmType = "film" | "cartoon";
export type SeriesType = "tv" | "anime";

const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c";
const API_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://netflix-api.test/storage/";
const IMAGE_BASE_URL_TMDB = "https://image.tmdb.org/t/p/w500/";
const LOCAL_API_BASE_URL = "https://netflix-api.test/api/v1";

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

async function fetchMoviesFromApi<T>(
  endpoint: string,
  params: Record<string, string | number | string[]> = {}
): Promise<PaginatedResponse<T>> {
  try {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) =>
          queryParams.append(`${key}[]`, item.toString())
        );
      } else if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value.toString());
      }
    });

    const queryString = queryParams.toString();
    const url = `${LOCAL_API_BASE_URL}${endpoint}${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch from ${endpoint}: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    return {
      data: [],
      links: { first: "", last: "", prev: null, next: null },
      meta: {
        current_page: 1,
        from: 0,
        last_page: 1,
        path: "",
        per_page: 15,
        to: 0,
        total: 0,
      },
    };
  }
}

export async function getMovies(
  params: {
    q?: string;
    page?: number;
    per_page?: number;
    sort?: SortField;
    direction?: SortDirection;
    kinds?: MovieKind[];
    statuses?: MovieStatus[];
    studio_ids?: string[];
    tag_ids?: string[];
    person_ids?: string[];
    countries?: string[];
    min_score?: number;
    max_score?: number;
    min_year?: number;
    max_year?: number;
    min_duration?: number;
    max_duration?: number;
    min_episodes_count?: number;
    max_episodes_count?: number;
  } = {}
): Promise<PaginatedResponse<Movie>> {
  return fetchMoviesFromApi<Movie>("/movies", params);
}

export async function getGenres(): Promise<Genre[]> {
  try {
    const response = await getMovies({ per_page: 100 });
    const genres = new Set<string>();

    response.data.forEach((movie) => {
      if (movie.main_genre) {
        genres.add(movie.main_genre);
      }
    });

    return Array.from(genres).map((name, index) => ({
      id: index + 1,
      name,
    }));
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
}

export async function getMoviesByGenre(genreName: string): Promise<Movie[]> {
  try {
    const response = await getMovies();
    return response.data.filter((movie) => movie.main_genre === genreName);
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return [];
  }
}

export async function searchMovies(query: string): Promise<Movie[]> {
  try {
    const response = await getMovies({ q: query });
    return response.data;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
}

export async function getMoviesByYear(year: string): Promise<Movie[]> {
  try {
    const response = await getMovies({
      min_year: parseInt(year),
      max_year: parseInt(year),
    });
    return response.data;
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

    const params: Record<string, string | number | string[]> = {};

    if (filmType === "cartoon") {
      params.kinds = ["animated_movie", "animated_series"];
    } else if (filmType === "film") {
      params.kinds = ["movie", "tv_series"];
    }

    if (year) {
      params.min_year = parseInt(year);
      params.max_year = parseInt(year);
    }

    params.sort = "imdb_score";
    params.direction = "desc";

    const response = await getMovies(params);

    if (genre && genre.trim()) {
      return response.data.filter((movie) => movie.main_genre === genre);
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching filtered movies:", error);
    return [];
  }
}

export function getImageUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) {
    return path;
  }
  return `${IMAGE_BASE_URL}${path}`;
}

export function getImageUrlTMDB(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) {
    return path;
  }
  return `${IMAGE_BASE_URL_TMDB}${path}`;
}

export async function getTrendingSeries(): Promise<Movie[]> {
  try {
    const response = await getMovies({
      kinds: ["tv_series", "animated_series"],
      sort: "imdb_score",
      direction: "desc",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching trending series:", error);
    return [];
  }
}

export async function getSeriesGenres(): Promise<Genre[]> {
  try {
    const response = await getMovies({
      kinds: ["tv_series", "animated_series"],
      per_page: 100,
    });
    const genres = new Set<string>();

    response.data.forEach((movie) => {
      if (movie.main_genre) {
        genres.add(movie.main_genre);
      }
    });

    return Array.from(genres).map((name, index) => ({
      id: index + 1,
      name,
    }));
  } catch (error) {
    console.error("Error fetching series genres:", error);
    return [];
  }
}

export async function searchSeries(query: string): Promise<Movie[]> {
  try {
    const response = await getMovies({
      q: query,
      kinds: ["tv_series", "animated_series"],
    });
    return response.data;
  } catch (error) {
    console.error("Error searching series:", error);
    return [];
  }
}

export async function getSeriesByYear(year: string): Promise<Movie[]> {
  try {
    const response = await getMovies({
      min_year: parseInt(year),
      max_year: parseInt(year),
      kinds: ["tv_series", "animated_series"],
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching series by year:", error);
    return [];
  }
}

export async function getFilteredSeries(options: {
  genre?: string;
  year?: string;
  seriesType?: SeriesType;
}): Promise<Movie[]> {
  try {
    const { genre, year, seriesType } = options;

    const params: Record<string, string | number | string[]> = {};

    if (seriesType === "anime") {
      params.kinds = ["animated_series"];
    } else if (seriesType === "tv") {
      params.kinds = ["tv_series"];
    } else {
      params.kinds = ["tv_series", "animated_series"];
    }

    if (year) {
      params.min_year = parseInt(year);
      params.max_year = parseInt(year);
    }

    params.sort = "imdb_score";
    params.direction = "desc";

    const response = await getMovies(params);

    if (genre && genre.trim()) {
      return response.data.filter((movie) => movie.main_genre === genre);
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching filtered series:", error);
    return [];
  }
}

export type MovieDetails = {
  id: string;
  name: string;
  slug: string;
  description: string;
  backdrop: string | null;
  poster: string;
  image_name: string;
  kind: string;
  status: string;
  duration: number;
  formatted_duration: string;
  episodes_count: number | null;
  countries: string[];
  aliases: string[];
  first_air_date: string;
  last_air_date: string | null;
  year: string;
  imdb_score: number;
  is_published: boolean;
  studio: {
    id: string;
    name: string;
    slug: string;
    description: string;
  } | null;
  tags: {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string | null;
    is_genre: boolean;
    aliases: string[];
    movies_count: number;
    created_at: string;
    updated_at: string;
  }[];
  created_at: string;
  updated_at: string;
  seo: {
    title: string;
    description: string;
    image: string;
  };
};

export type MovieResponse = {
  data: MovieDetails;
};

export async function getMovieBySlug(
  slug: string
): Promise<MovieDetails | null> {
  try {
    const response = await fetch(`${LOCAL_API_BASE_URL}/movies/${slug}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    const data: MovieResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching movie details:`, error);
    return null;
  }
}

export type Episode = {
  id: string;
  name: string;
  slug: string;
  description: string;
  url: string;
  duration: number;
  formatted_duration: string;
  number: number;
  season_number: number;
  created_at: string;
  updated_at: string;
};

export type EpisodesResponse = PaginatedResponse<Episode>;

export async function getMovieEpisodes(
  movieSlug: string,
  params: {
    page?: number;
    per_page?: number;
  } = {}
): Promise<EpisodesResponse> {
  try {
    const queryParams = new URLSearchParams();

    if (params.page) {
      queryParams.append("page", params.page.toString());
    }

    if (params.per_page) {
      queryParams.append("per_page", params.per_page.toString());
    }

    const queryString = queryParams.toString();
    const url = `${LOCAL_API_BASE_URL}/movies/${movieSlug}/episodes${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch episodes: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching episodes:`, error);
    return {
      data: [],
      links: { first: "", last: "", prev: null, next: null },
      meta: {
        current_page: 1,
        from: 0,
        last_page: 1,
        path: "",
        per_page: 15,
        to: 0,
        total: 0,
      },
    };
  }
}
