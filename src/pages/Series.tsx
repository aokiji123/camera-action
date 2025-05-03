import { FaSearch, FaStar, FaUndo } from "react-icons/fa";
import { Header } from "../shared/components/Header";
import { Select } from "../shared/components/Select";
import { useState, useEffect, useCallback } from "react";
import background from "../assets/header-bg.png";
import { SeriesCard } from "../shared/components/SeriesCard";
import {
  type Series,
  getTrendingSeries,
  getSeriesGenres,
  getFilteredSeries,
  searchSeries,
  SeriesType,
} from "../shared/api/movieService";

export function Series() {
  const [seriesType, setSeriesType] = useState<SeriesType | "">("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [genreList, setGenreList] = useState<
    { value: string; label: string }[]
  >([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

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

  const fetchTrendingSeries = useCallback(async () => {
    setIsLoading(true);
    const data = await getTrendingSeries();
    setSeriesList(data);
    setIsLoading(false);
  }, []);

  const applyFilters = useCallback(async () => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      const data = await searchSeries(searchQuery);
      setSeriesList(data);
      setIsLoading(false);
      setActiveFilter("search");
      return;
    }

    if (seriesType || genre || year) {
      setIsLoading(true);
      const data = await getFilteredSeries({
        seriesType: seriesType as SeriesType | undefined,
        genre: genre || undefined,
        year: year || undefined,
      });
      setSeriesList(data);
      setIsLoading(false);

      if (seriesType && genre && year) {
        setActiveFilter("combined");
      } else if (seriesType) {
        setActiveFilter("seriesType");
      } else if (genre) {
        setActiveFilter("genre");
      } else if (year) {
        setActiveFilter("year");
      }
    } else {
      fetchTrendingSeries();
      setActiveFilter(null);
    }
  }, [seriesType, genre, year, searchQuery, fetchTrendingSeries]);

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
    fetchTrendingSeries();
  }, [fetchTrendingSeries]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleSearch = async () => {
    applyFilters();
  };

  const resetFilters = async () => {
    setSeriesType("");
    setGenre("");
    setYear("");
    setSearchQuery("");
    setActiveFilter(null);
    fetchTrendingSeries();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
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

    return "Популярні серіали";
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
                className="absolute right-[16px] top-1/2 transform -translate-y-1/2 cursor-pointer"
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
                onChange={(val) => setSeriesType(val as SeriesType)}
                minWidth="150px"
                placeholder="тип"
              />
              <Select
                options={genreList}
                value={genre}
                onChange={setGenre}
                minWidth="150px"
                placeholder="жанр"
              />
              <Select
                options={yearOptions}
                value={year}
                onChange={setYear}
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
          {(seriesType || genre || year || searchQuery) && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-[8px] text-[16px] cursor-pointer"
            >
              <FaUndo size={16} /> Скинути фільтри
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-[24px]">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <div key={`loading-${index}`} className="w-[305px]">
                <div className="w-full bg-gray-800 animate-pulse h-[400px] rounded-[28px]"></div>
                <div className="w-full flex flex-col gap-[4px] items-center justify-center mt-[12px]">
                  <div className="flex items-center gap-[18px]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} size={16} className="text-gray-400" />
                    ))}
                  </div>
                  <div className="h-[30px] w-[200px] bg-gray-800 animate-pulse rounded"></div>
                </div>
              </div>
            ))
          ) : seriesList.length > 0 ? (
            seriesList.map((series) => (
              <SeriesCard key={series.id} series={series} />
            ))
          ) : (
            <p className="text-center w-full text-gray-500 text-[20px]">
              No series found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
