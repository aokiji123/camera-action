import { FaStar, FaFilm, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Movie, getImageUrl } from "../api/movieService";

type CardProps = {
  movie: Movie;
};

export function Card({ movie }: CardProps) {
  const rating = movie.vote_average / 2;

  const getRandomColor = () => {
    const colors = [
      "bg-red-600",
      "bg-blue-600",
      "bg-emerald-600",
      "bg-purple-600",
      "bg-amber-600",
      "bg-pink-600",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const hasImage = movie.poster_path && movie.poster_path !== "";

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`full-${i}`} size={16} className="text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt key="half" size={16} className="text-yellow-400" />
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStar key={`empty-${i}`} size={16} className="text-gray-400" />
      );
    }

    return stars;
  };

  return (
    <div className="w-[305px]">
      <div className="w-full h-[400px] rounded-[28px] overflow-hidden">
        {hasImage ? (
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className={`w-full h-full flex flex-col items-center justify-center ${getRandomColor()} p-4`}
          >
            <FaFilm size={64} className="text-white/80 mb-4" />
            <h3 className="text-white text-center font-bold text-2xl break-words">
              {movie.title}
            </h3>
            <p className="text-white/70 mt-2 text-sm">
              {movie.release_date?.split("-")[0] || "No release date"}
            </p>
          </div>
        )}
      </div>
      <div className="w-full flex flex-col gap-[4px] items-center justify-center mt-[12px]">
        <div className="flex items-center gap-[18px]">{renderStars()}</div>
        <p className="text-[24px] font-bold">{movie.title}</p>
      </div>
    </div>
  );
}
