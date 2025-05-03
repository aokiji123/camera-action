import { FaStar, FaTv, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Series, getImageUrl } from "../api/movieService";

type SeriesCardProps = {
  series: Series;
};

export function SeriesCard({ series }: SeriesCardProps) {
  const rating = series.vote_average / 2;

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

  const hasImage = series.poster_path && series.poster_path !== "";

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
            src={getImageUrl(series.poster_path)}
            alt={series.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className={`w-full h-full flex flex-col items-center justify-center ${getRandomColor()} p-4`}
          >
            <FaTv size={64} className="text-white/80 mb-4" />
            <h3 className="text-white text-center font-bold text-2xl break-words">
              {series.name}
            </h3>
            <p className="text-white/70 mt-2 text-sm">
              {series.first_air_date?.split("-")[0] || "No release date"}
            </p>
          </div>
        )}
      </div>
      <div className="w-full flex flex-col gap-[4px] items-center justify-center mt-[12px]">
        <div className="flex items-center gap-[18px]">{renderStars()}</div>
        <p className="text-[24px] font-bold">{series.name}</p>
      </div>
    </div>
  );
}
