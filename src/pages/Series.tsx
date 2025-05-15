import {
  FaSearch,
  FaStar,
  FaUndo,
  FaChevronLeft,
  FaChevronRight,
  FaSort,
} from "react-icons/fa";
import { Header } from "../shared/components/Header";
import { Select } from "../shared/components/Select";
import { useState, useEffect, useCallback } from "react";
import background from "../assets/header-bg.png";
import { Card } from "../shared/components/Card";
import {
  Movie,
  getSeriesGenres,
  getMovies,
  SeriesType,
  SortField,
  SortDirection,
  PaginatedResponse,
} from "../shared/api/movieService";
import { Link } from "react-router-dom";

export function Series() {
  const [seriesType, setSeriesType] = useState<SeriesType | "">("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [series, setSeries] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [genreList, setGenreList] = useState<
    { value: string; label: string }[]
  >([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [perPage] = useState(15);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Sorting state
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const seriesTypeOptions = [
    { value: "tv", label: "серіал" },
    { value: "anime", label: "аніме" },
  ];

  const yearOptions = [
    { value: "2009", label: "2009" },
    { value: "2010", label: "2010" },
    { value: "2011", label: "2011" },
    { value: "2012", label: "2012" },
    { value: "2013", label: "2013" },
    { value: "2014", label: "2014" },
    { value: "2015", label: "2015" },
    { value: "2016", label: "2016" },
    { value: "2017", label: "2017" },
    { value: "2018", label: "2018" },
    { value: "2019", label: "2019" },
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
  ];

  const sortOptions = [
    { value: "name", label: "Назва" },
    { value: "created_at", label: "Дата додавання" },
    { value: "imdb_score", label: "Рейтинг IMDb" },
    { value: "first_air_date", label: "Дата виходу" },
    { value: "episodes_count", label: "Кількість епізодів" },
  ];

  // Set active filter function - pulled out for clarity
  const updateActiveFilter = useCallback(() => {
    if (searchQuery.trim()) {
      return "search";
    } else if (seriesType && genre && year) {
      return "combined";
    } else if (seriesType) {
      return "seriesType";
    } else if (genre) {
      return "genre";
    } else if (year) {
      return "year";
    }
    return null;
  }, [seriesType, genre, year, searchQuery]);

  // Fetch series function without useCallback to avoid dependency issues
  const fetchSeries = async () => {
    setIsLoading(true);

    try {
      const params: Record<string, string | number | string[] | boolean> = {
        page,
        per_page: perPage,
        sort: sortField,
        direction: sortDirection,
        kinds: ["tv_series", "animated_series"], // Always filter for series types
      };

      // Add search query if present
      if (searchQuery.trim()) {
        params.q = searchQuery;
      }

      // Add series type filter
      if (seriesType === "anime") {
        params.kinds = ["animated_series"];
      } else if (seriesType === "tv") {
        params.kinds = ["tv_series"];
      }

      // Add year filter
      if (year) {
        params.min_year = parseInt(year);
        params.max_year = parseInt(year);
      }

      const response: PaginatedResponse<Movie> = await getMovies(params);

      let filteredSeries = response.data;

      // Client-side genre filtering if needed
      if (genre) {
        filteredSeries = filteredSeries.filter(
          (item) =>
            item.main_genre === genreList.find((g) => g.value === genre)?.label
        );
      }

      setSeries(filteredSeries);
      setTotalItems(response.meta.total);
      setTotalPages(response.meta.last_page);
      setActiveFilter(updateActiveFilter());
    } catch (error) {
      console.error("Error fetching series:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load - fetch genres and series
  useEffect(() => {
    const fetchGenres = async () => {
      const genres = await getSeriesGenres();
      const formattedGenres = genres.map((g) => ({
        value: g.id.toString(),
        label: g.name,
      }));
      setGenreList(formattedGenres);
    };

    fetchGenres();
    fetchSeries(); // Initial fetch
  }, []);

  // Effect for when filters/pagination/sorting changes
  useEffect(() => {
    fetchSeries();
    // This effect depends on these actual values, not on the fetchSeries function
  }, [
    seriesType,
    genre,
    year,
    searchQuery,
    page,
    perPage,
    sortField,
    sortDirection,
  ]);

  const handleSearch = () => {
    setPage(1); // Reset to first page on new search
  };

  const resetFilters = () => {
    setSeriesType("");
    setGenre("");
    setYear("");
    setSearchQuery("");
    setActiveFilter(null);
    setSortField("created_at");
    setSortDirection("desc");
    setPage(1);
    fetchSeries();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const changePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSortChange = (field: SortField) => {
    // If clicking the same field, toggle direction
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc"); // Default to descending for new fields
    }
  };

  const getFilterTitle = () => {
    if (searchQuery && activeFilter === "search") {
      return `Результати пошуку: ${searchQuery}`;
    }

    if (
      activeFilter === "combined" ||
      (activeFilter && (seriesType || genre || year))
    ) {
      const parts = [];

      if (seriesType) {
        parts.push(
          seriesTypeOptions.find((s) => s.value === seriesType)?.label || ""
        );
      }

      if (genre) {
        parts.push(genreList.find((g) => g.value === genre)?.label || "");
      }

      if (year) {
        parts.push(year);
      }

      return `${parts.join(", ")}`;
    }

    return "Серіали";
  };

  return (
    <div>
      <div
        className="flex flex-col items-center h-[870px] relative bg-gray-900"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Header />
        <div className="flex flex-col items-center gap-[24px] justify-center h-full w-[560px]">
          <div
            className="h-[125px] w-full border-1 border-white rounded-[20px] flex items-center justify-center"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
            }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Пошук"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-[420px] h-[55px] bg-transparent text-white rounded-[10px] px-[16px] pr-[48px] py-[8px] text-[20px] font-ysabeau border-1 border-white placeholder:italic font-light placeholder:font-light"
              />
              <FaSearch
                size={20}
                onClick={handleSearch}
                className="absolute right-[16px] top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
              />
            </div>
          </div>
          <div
            className="h-[125px] w-full border-1 border-white rounded-[20px] p-[24px] flex items-center justify-center"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
            }}
          >
            <div className="flex justify-between gap-[24px] items-center">
              <Select
                options={seriesTypeOptions}
                value={seriesType}
                onChange={(val) => {
                  setSeriesType(val as SeriesType);
                  setPage(1); // Reset to first page on filter change
                }}
                minWidth="150px"
                placeholder="тип"
              />
              <Select
                options={genreList}
                value={genre}
                onChange={(val) => {
                  setGenre(val);
                  setPage(1); // Reset to first page on filter change
                }}
                minWidth="150px"
                placeholder="жанр"
              />
              <Select
                options={yearOptions}
                value={year}
                onChange={(val) => {
                  setYear(val);
                  setPage(1); // Reset to first page on filter change
                }}
                minWidth="100px"
                placeholder="рік"
              />
              <button
                onClick={resetFilters}
                className="h-[55px] w-[55px] rounded-[10px] border border-white flex items-center justify-center bg-transparent text-white cursor-pointer"
              >
                <FaUndo size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[24px] px-[36px] py-[24px]">
        <div className="flex justify-between items-center">
          <p className="text-[24px] font-bold">{getFilterTitle()}</p>

          <div className="flex gap-4">
            {/* Sorting dropdown */}
            <div className="flex items-center gap-2">
              <Select
                options={sortOptions}
                value={sortField}
                onChange={(val) => handleSortChange(val as SortField)}
                minWidth="180px"
                placeholder="Сортувати за"
              />
              <button
                onClick={() =>
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                }
                className="p-2 rounded hover:bg-gray-500"
              >
                <FaSort
                  className={
                    sortDirection === "asc" ? "transform rotate-180" : ""
                  }
                />
              </button>
            </div>

            {(seriesType || genre || year || searchQuery) && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-[8px] text-[16px] cursor-pointer"
              >
                <FaUndo size={16} /> Скинути фільтри
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-[24px]">
          {isLoading ? (
            Array.from({ length: perPage }).map((_, index) => (
              <div key={`loading-${index}`} className="w-[305px]">
                <div className="w-full bg-gray-500 animate-pulse h-[400px] rounded-[28px]"></div>
                <div className="w-full flex flex-col gap-[4px] items-center justify-center mt-[12px]">
                  <div className="flex items-center gap-[18px]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} size={16} className="text-gray-400" />
                    ))}
                  </div>
                  <div className="h-[30px] w-[200px] bg-gray-500 animate-pulse rounded"></div>
                </div>
              </div>
            ))
          ) : series.length > 0 ? (
            series.map((item) => (
              <Link to={`/series/${item.slug}`} key={item.id}>
                <Card key={item.id} movie={item} />
              </Link>
            ))
          ) : (
            <p className="text-center w-full text-gray-500 text-[20px]">
              No series found
            </p>
          )}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              onClick={() => changePage(page - 1)}
              disabled={page === 1}
              className={`p-2 rounded-full ${
                page === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              <FaChevronLeft />
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages).keys()].map((i) => {
                const pageNum = i + 1;
                // Show only current page, first, last, and a few pages around current
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= page - 1 && pageNum <= page + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => changePage(pageNum)}
                      className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center ${
                        pageNum === page
                          ? "bg-red-500 text-white"
                          : "hover:bg-gray-500"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  (pageNum === page - 2 && page > 3) ||
                  (pageNum === page + 2 && page < totalPages - 2)
                ) {
                  return <span key={pageNum}>...</span>;
                } else {
                  return null;
                }
              })}
            </div>

            <button
              onClick={() => changePage(page + 1)}
              disabled={page === totalPages}
              className={`p-2 rounded-full ${
                page === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              <FaChevronRight />
            </button>

            <div className="ml-4 text-sm text-gray-500">
              Showing {(page - 1) * perPage + 1}-
              {Math.min(page * perPage, totalItems)} of {totalItems}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
