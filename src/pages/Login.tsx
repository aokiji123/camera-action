import { FaCheck } from "react-icons/fa";
import background from "../assets/auth-bg.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div
      className="flex flex-col items-center h-[1250px] relative"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="h-[125px] w-full flex items-center justify-between cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div>
          <img src={logo} alt="logo" className="w-[250px] h-[115px]" />
        </div>
      </div>
      <div
        className="absolute top-[250px] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center font-ysabeau text-white w-[560px] h-[600px] p-[36px] rounded-[20px] border-1 border-white"
        style={{
          background: "rgba(255, 255, 255, 0.2)",
        }}
      >
        <p className="text-[45px] font-extrabold text-center leading-[60px] uppercase mb-[36px]">
          Увійти в акаунт
        </p>
        <form className="flex flex-col items-center justify-center gap-[24px]">
          <input
            type="email"
            placeholder="Логін"
            className="w-[450px] h-[55px] text-[20px] font-normal rounded-[10px] border-1 border-white flex items-center justify-center mr-[8px] px-[16px] placeholder:text-[#BFBFBF] placeholder:text-[20px] bg-transparent"
          />
          <input
            type="password"
            placeholder="Пароль"
            className="w-[450px] h-[55px] text-[20px] font-normal rounded-[10px] border-1 border-white flex items-center justify-center mr-[8px] px-[16px] placeholder:text-[#BFBFBF] placeholder:text-[20px] bg-transparent"
          />
          <button className="w-[450px] h-[55px] text-[20px] font-normal rounded-[10px] border-1 border-white flex items-center justify-center mr-[8px] cursor-pointer px-[16px] placeholder:text-white placeholder:text-[20px] bg-[#A0081F]">
            Увійти
          </button>
          <a className="text-[20px] font-normal text-center hover:underline cursor-pointer">
            Забули пароль?
          </a>
          <button className="w-[450px] h-[55px] text-[20px] font-normal rounded-[10px] border-1 border-white flex items-center justify-center mr-[8px] cursor-pointer px-[16px] placeholder:text-white placeholder:text-[20px] bg-[#A0081F]">
            Увійти через акаунт Google
          </button>
          <div className="w-[450px] flex items-center justify-center gap-[16px]">
            <div className="relative">
              <input
                type="checkbox"
                id="termsCheckbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="sr-only" // Hide the actual checkbox but keep it accessible
              />
              <label
                htmlFor="termsCheckbox"
                className="flex items-center justify-center w-[30px] h-[30px] rounded-[10px] border border-white cursor-pointer"
                style={{
                  background: isChecked ? "#fff" : "#666666",
                }}
              >
                {isChecked && <FaCheck color="black" size={16} />}
              </label>
            </div>
            <p className="text-[13px] font-normal ">
              Продовжуючи, ви приймаєте Умови надання послуг та підтверджуєте,
              що ознайомилися з нашою Політикою конфіденційності. Повідомлення.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
