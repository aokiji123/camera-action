import { FaUser } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Header = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  return (
    <div className="h-[125px] w-full">
      {isAuth ? (
        <div className="flex items-center justify-between pr-[36px]">
          <div>
            <img
              src={logo}
              alt="logo"
              className="w-[250px] h-[115px] cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>
          <nav>
            <ul className="flex items-center justify-center gap-[24px] uppercase text-white">
              <li className="text-[24px] font-ysabeau font-bold cursor-pointer hover:underline">
                <a href="/">Головна</a>
              </li>
              <li className="text-[24px] font-ysabeau font-bold cursor-pointer hover:underline">
                <a href="/my-list">Мій список</a>
              </li>
              <li className="text-[24px] font-ysabeau font-bold cursor-pointer hover:underline">
                <a href="/films">Фільми</a>
              </li>
              <li className="text-[24px] font-ysabeau font-bold cursor-pointer hover:underline">
                <a href="/series">Телесеріали</a>
              </li>
              <li className="text-[24px] font-ysabeau font-bold cursor-pointer hover:underline">
                <a href="/payment">Оплата</a>
              </li>
              <li className="text-[24px] font-ysabeau font-bold cursor-pointer hover:underline">
                <a href="/history">Історія сайту</a>
              </li>
            </ul>
          </nav>
          <div className="text-white cursor-pointer relative group">
            <FaUser size={34} onClick={() => navigate("/profile")} />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <img
              src={logo}
              alt="logo"
              className="w-[250px] h-[115px]  cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>
          <button
            className="w-[275px] h-[75px] text-[32px] font-normal rounded-[50px] border-1 border-white flex items-center justify-center mr-[8px] cursor-pointer transition-all duration-300 text-white"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
            }}
            onClick={() => navigate("/sign-up")}
          >
            Зареєструватись
          </button>
        </div>
      )}
    </div>
  );
};
