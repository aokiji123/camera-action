import { FaStar, FaQuestion } from "react-icons/fa";
import { Movie, getImageUrl } from "../api/movieService";
import { useState } from "react";

interface CardProps {
  movie: Movie;
}

export function Card({ movie }: CardProps) {
  const [imageError, setImageError] = useState(false);

  // Convert rating to 5-star scale (if it exists)
  const rating = movie.imdb_score ? movie.imdb_score / 2 : 0;

  // Get the appropriate image
  const imageUrl = movie.poster
    ? getImageUrl(movie.poster)
    : getImageUrl(movie.image_name);

  // Format the movie type for display
  const getMovieType = () => {
    switch (movie.kind) {
      case "movie":
        return "Фільм";
      case "tv_series":
        return "Серіал";
      case "animated_movie":
        return "Мультфільм";
      case "animated_series":
        return "Мультсеріал";
      default:
        return "";
    }
  };

  return (
    <div className="w-[305px] cursor-pointer hover:scale-[1.02] transition-transform">
      <div className="w-full rounded-[28px] relative overflow-hidden">
        {!imageError && imageUrl ? (
          <img
            src={imageUrl}
            alt={movie.name}
            className="w-full h-[400px] object-cover"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-[400px] bg-gray-800 flex items-center justify-center">
            <FaQuestion size={64} className="text-gray-400" />
          </div>
        )}
        {movie.status && (
          <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
            {movie.status === "released"
              ? "Випущено"
              : movie.status === "ongoing"
              ? "В процесі"
              : movie.status === "anons"
              ? "Анонс"
              : movie.status === "canceled"
              ? "Скасовано"
              : movie.status === "rumored"
              ? "Чутки"
              : ""}
          </div>
        )}
        {getMovieType() && (
          <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
            {getMovieType()}
          </div>
        )}
        {movie.release_year && (
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
            {movie.release_year}
          </div>
        )}
      </div>
      <div className="w-full flex flex-col gap-[4px] items-center justify-center mt-[12px]">
        <div className="flex items-center gap-[8px]">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar
              key={i}
              size={16}
              className={
                i < Math.floor(rating)
                  ? "text-yellow-400"
                  : i < rating
                  ? "text-yellow-300"
                  : "text-gray-400"
              }
            />
          ))}
          {movie.imdb_score && (
            <span className="text-gray-700 text-sm ml-1">
              ({movie.imdb_score.toFixed(1)})
            </span>
          )}
        </div>
        <h3 className="text-[18px] font-medium text-center line-clamp-2">
          {movie.name}
        </h3>
        {movie.main_genre && (
          <span className="text-gray-500 text-sm">{movie.main_genre}</span>
        )}
      </div>
    </div>
  );
}
