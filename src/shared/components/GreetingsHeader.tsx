import { FaUser } from "react-icons/fa";
import background from "../../assets/header-bg.png";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

export const GreetingsHeader = () => {
  const navigate = useNavigate();
  const isAuth = true;

  return (
    <header
      className="flex flex-col items-center h-[870px] relative"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
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
                  <a href="#">Мій список</a>
                </li>
                <li className="text-[24px] font-ysabeau font-bold cursor-pointer hover:underline">
                  <a href="/films">Фільми</a>
                </li>
                <li className="text-[24px] font-ysabeau font-bold cursor-pointer hover:underline">
                  <a href="#">Телесеріали</a>
                </li>
                <li className="text-[24px] font-ysabeau font-bold cursor-pointer hover:underline">
                  <a href="#">Оплата</a>
                </li>
                <li className="text-[24px] font-ysabeau font-bold cursor-pointer hover:underline">
                  <a href="#">Історія сайту</a>
                </li>
              </ul>
            </nav>
            <div className="text-white cursor-pointer">
              <FaUser size={34} />
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center font-ysabeau text-white w-[850px] gap-[48px]">
        <p className="text-[54px] font-extrabold text-center leading-[60px]">
          КамераAction – дій, дивись, переживай, насолоджуйся у світі улюблених
          кіно, аніме та серіалів без обмежень
        </p>
        <p className="text-[32px] font-normal text-center h-[100px] leading-[40px]">
          Перший місяць підписки даруємо безкоштовно, тож доєднуйся вже зараз!
        </p>
        <div className="flex items-center justify-center gap-[8px]">
          <input
            type="email"
            placeholder="Адреса електронної пошти"
            className="w-[450px] h-[75px] text-[32px] font-normal rounded-[50px] border-1 border-white flex items-center justify-center mr-[8px] cursor-pointer transition-all duration-300 text-center placeholder:text-white"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
            }}
          />
          <button
            className="w-[200px] h-[75px] text-[36px] font-bold rounded-[50px] border-1 border-white flex items-center justify-center mr-[8px] cursor-pointer transition-all duration-300"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
            }}
          >
            Увійти
          </button>
        </div>
      </div>
    </header>
  );
};
