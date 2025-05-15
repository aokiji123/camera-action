import { Header } from "../shared/components/Header";
import background from "../assets/header-bg.png";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../shared/context/AuthContext";

export const Profile = () => {
  const { logout } = useAuth();
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center font-ysabeau text-white w-[560px] gap-[48px]">
          <div className="w-[350px] h-[350px] rounded-full bg-[#AAAAAABF] flex items-center justify-center">
            <FaUser className="size-[230px]" />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-[24px]">
        <p className="text-[40px] text-center font-extrabold mt-[12px]">
          Моя підписка
        </p>
        <div className="bg-[#FF788C] p-[12px] rounded-[12px] text-center mt-[12px]">
          <p className="text-[24px] font-bold text-black">ПРЕМІУМ</p>
          <p className="text-[24px] font-bold text-black">(659,00 ₴/міс)</p>
        </div>
        <div className="w-[80%] border-1 border-white p-[12px] rounded-[24px] text-[28px] flex flex-col gap-[24px]">
          <div className="flex items-center justify-between">
            <p>Якість відео:</p>
            <p>4K HDR (2160p)</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Кількість пристроїв:</p>
            <p>3</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Офлайн-завантаження:</p>
            <p>є</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Наступне поновлення:</p>
            <p>20/07/2025</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Статус:</p>
            <p>активна</p>
          </div>
          <div className="flex items-center justify-center">
            <button className="p-2 text-black uppercase text-[24px] font-bold bg-[#C7C7C7] rounded-[12px] w-fit cursor-pointer">
              Скасувати підписку
            </button>
          </div>
        </div>
        <div>
          <button
            onClick={logout}
            className="p-2 text-black uppercase text-[24px] font-bold bg-[#C7C7C7] rounded-[12px] w-fit cursor-pointer"
          >
            Вийти з акаунту
          </button>
        </div>
      </div>
    </div>
  );
};
