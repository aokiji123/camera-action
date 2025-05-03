import background from "../../assets/header-bg.png";
import { Header } from "./Header";

export const GreetingsHeader = () => {
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
      <Header />
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
