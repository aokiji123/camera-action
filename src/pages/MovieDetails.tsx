import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import {
  getMovieBySlug,
  getMovieEpisodes,
  type MovieDetails,
  type Episode,
  getImageUrl,
} from "../shared/api/movieService";
import {
  FaHome,
  FaQuestion,
  FaStar,
  FaCalendarAlt,
  FaFilm,
  FaGlobe,
  FaTag,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaBackward,
  FaForward,
  FaExpand,
  FaCompress,
  FaClosedCaptioning,
} from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";
import background from "../assets/header-bg.png";
import { Header } from "../shared/components/Header";

export function MovieDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingEpisodes, setIsLoadingEpisodes] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  // Player state
  const playerRef = useRef<ReactPlayer>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!slug) {
        setError("Відсутній ідентифікатор фільму");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await getMovieBySlug(slug);
        if (!data) {
          setError("Фільм не знайдено");
        } else {
          setMovie(data);
          fetchEpisodes(slug);
        }
      } catch (err) {
        setError("Помилка при завантаженні деталей фільму");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [slug]);

  const fetchEpisodes = async (movieSlug: string) => {
    try {
      setIsLoadingEpisodes(true);
      const response = await getMovieEpisodes(movieSlug);
      setEpisodes(response.data);
      if (response.data.length > 0) {
        setSelectedEpisode(response.data[0]);
      }
    } catch (err) {
      console.error("Error fetching episodes:", err);
    } finally {
      setIsLoadingEpisodes(false);
    }
  };

  // Player functions
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleRewind = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(Math.max(currentTime - 10, 0));
    }
  };

  const handleForward = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(Math.min(currentTime + 10, duration));
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    setSeeking(false);
    if (playerRef.current) {
      playerRef.current.seekTo(
        parseFloat((e.target as HTMLInputElement).value)
      );
    }
  };

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const toggleFullScreen = () => {
    if (!videoContainerRef.current) return;

    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message}`
        );
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const pad = (str: number) => `0${Math.floor(str)}`.slice(-2);
    const minutes = seconds / 60;
    const hours = minutes / 60;

    if (hours >= 1) {
      return `${pad(hours)}:${pad(minutes % 60)}:${pad(seconds % 60)}`;
    }
    return `${pad(minutes)}:${pad(seconds % 60)}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen text-white p-8">
        <div className="max-w-4xl mx-auto rounded-lg p-8 text-center">
          <p className="text-3xl font-bold mb-4">
            {error || "Фільм не знайдено"}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-white rounded transition-colors inline-flex items-center gap-2"
          >
            <FaHome /> Повернутися назад
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className="flex flex-col h-[870px] relative bg-gray-900"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Header />
        <div className="flex flex-row items-center gap-[24px] justify-center h-full px-[48px]">
          <div className="h-[650px] w-[500px] overflow-hidden rounded-[28px] relative group">
            {!imageError && movie.poster ? (
              <img
                src={getImageUrl(movie.poster)}
                alt={movie.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-500">
                <FaQuestion size={64} className="text-gray-400" />
              </div>
            )}
          </div>

          <div className="text-white w-[50%]">
            <p className="text-3xl font-bold mb-2">{movie.name}</p>
            <p className="text-gray-300 mb-4">
              {movie.formatted_duration} | {movie.year}
            </p>
            <p className="text-gray-300 mb-6">{movie.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-500" />
                <span>IMDb: {movie.imdb_score.toFixed(1)}</span>
              </div>

              {movie.first_air_date && (
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-400" />
                  <span>
                    Дата:{" "}
                    {new Date(movie.first_air_date).toLocaleDateString("uk-UA")}
                  </span>
                </div>
              )}

              {movie.kind && (
                <div className="flex items-center gap-2">
                  <FaFilm className="text-red-400" />
                  <span>
                    Тип:{" "}
                    {movie.kind === "movie"
                      ? "Фільм"
                      : movie.kind === "tv_series"
                      ? "Серіал"
                      : movie.kind === "animated_movie"
                      ? "Мультфільм"
                      : "Мультсеріал"}
                  </span>
                </div>
              )}

              {movie.countries.length > 0 && (
                <div className="flex items-center gap-2">
                  <FaGlobe className="text-green-400" />
                  <span>Країна: {movie.countries.join(", ")}</span>
                </div>
              )}
            </div>

            {movie.tags.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <FaTag className="text-purple-400" />
                  <span>Теги:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {movie.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 bg-gray-500 rounded-full text-sm"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {movie.studio && (
              <div>
                <p className="font-semibold">Студія: {movie.studio.name}</p>
                {movie.studio.description && (
                  <p className="text-gray-400 text-sm">
                    {movie.studio.description}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Player section */}
      <div className="container mx-auto px-6 py-12">
        {isLoadingEpisodes ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : episodes.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold mb-8 text-white">Плеєр</h2>

            {/* Custom Video player */}
            <div
              ref={videoContainerRef}
              className="aspect-video bg-black rounded-lg overflow-hidden mb-8 relative"
            >
              <div className="absolute inset-0">
                <ReactPlayer
                  ref={playerRef}
                  url={selectedEpisode?.video_players[0].url}
                  width="100%"
                  height="100%"
                  playing={isPlaying}
                  volume={volume}
                  muted={isMuted}
                  onProgress={handleProgress}
                  onDuration={handleDuration}
                  config={{
                    file: {
                      attributes: {
                        onContextMenu: (e: React.MouseEvent) =>
                          e.preventDefault(),
                        controlsList: "nodownload",
                      },
                    },
                  }}
                />
              </div>

              {/* Custom controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-100 transition-opacity duration-300 flex flex-col">
                {/* Progress bar */}
                <div className="mb-2 w-full flex items-center">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={played}
                    onChange={handleSeekChange}
                    onMouseDown={handleSeekMouseDown}
                    onMouseUp={handleSeekMouseUp}
                    className="w-full appearance-none h-1 bg-gray-600 rounded-full cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, white ${
                        played * 100
                      }%, #4b5563 ${played * 100}%)`,
                    }}
                  />
                </div>

                {/* Controls row */}
                <div className="flex justify-between items-center">
                  {/* Left controls */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handlePlayPause}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
                    </button>

                    <button
                      onClick={handleRewind}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      <FaBackward size={18} />
                    </button>

                    <button
                      onClick={handleForward}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      <FaForward size={18} />
                    </button>

                    <button
                      onClick={handleMute}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      {isMuted ? (
                        <FaVolumeMute size={18} />
                      ) : (
                        <FaVolumeUp size={18} />
                      )}
                    </button>

                    <div className="w-20 hidden group-hover:block">
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step="any"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-full appearance-none h-1 bg-gray-600 rounded-full cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, white ${
                            volume * 100
                          }%, #4b5563 ${volume * 100}%)`,
                        }}
                      />
                    </div>

                    <span className="text-white text-sm">
                      {formatTime(duration * played)} / {formatTime(duration)}
                    </span>
                  </div>

                  {/* Right controls */}
                  <div className="flex items-center gap-4">
                    <button className="text-white hover:text-gray-300 transition-colors">
                      <IoMdPhotos size={18} />
                    </button>

                    <button className="text-white hover:text-gray-300 transition-colors">
                      <FaClosedCaptioning size={18} />
                    </button>

                    <button
                      onClick={toggleFullScreen}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      {isFullScreen ? (
                        <FaCompress size={18} />
                      ) : (
                        <FaExpand size={18} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Episodes list */}
            {episodes.length > 1 && (
              <div>
                <h3 className="text-xl font-bold mb-4 text-white">Епізоди</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {episodes.map((episode) => (
                    <div
                      key={episode.id}
                      className={`p-4 rounded-lg cursor-pointer ${
                        selectedEpisode?.id === episode.id
                          ? "bg-gray-500"
                          : "bg-gray-500 hover:bg-gray-700"
                      }`}
                      onClick={() => setSelectedEpisode(episode)}
                    >
                      <p className="font-bold text-white">{episode.name}</p>
                      <p className="text-sm text-gray-300">
                        {episode.season_number > 0
                          ? `Сезон ${episode.season_number}, `
                          : ""}
                        Епізод {episode.number}
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        {episode.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-500 rounded-lg p-8 text-center">
            <p className="text-xl text-gray-300">
              Немає доступних епізодів для перегляду
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
