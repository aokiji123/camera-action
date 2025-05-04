import { FaCheck } from "react-icons/fa";
import background from "../assets/auth-bg.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../shared/api/authService";
import { useAuth } from "../shared/context/AuthContext";

export const Login = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Будь ласка, заповніть всі поля");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      await login({
        email,
        password,
        remember: isChecked,
      });

      // Update authentication state
      await refreshUser();

      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Помилка входу");
    } finally {
      setIsLoading(false);
    }
  };

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
        {error && (
          <p className="text-red-500 mb-4 text-center w-full">{error}</p>
        )}
        <form
          className="flex flex-col items-center justify-center gap-[24px]"
          onSubmit={handleLogin}
        >
          <input
            type="email"
            placeholder="Логін"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[450px] h-[55px] text-[20px] font-normal rounded-[10px] border-1 border-white flex items-center justify-center mr-[8px] px-[16px] placeholder:text-[#BFBFBF] placeholder:text-[20px] bg-transparent"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[450px] h-[55px] text-[20px] font-normal rounded-[10px] border-1 border-white flex items-center justify-center mr-[8px] px-[16px] placeholder:text-[#BFBFBF] placeholder:text-[20px] bg-transparent"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-[450px] h-[55px] text-[20px] font-normal rounded-[10px] border-1 border-white flex items-center justify-center mr-[8px] cursor-pointer px-[16px] placeholder:text-white placeholder:text-[20px] bg-[#A0081F] disabled:opacity-70"
          >
            {isLoading ? "Завантаження..." : "Увійти"}
          </button>
          <a className="text-[20px] font-normal text-center hover:underline cursor-pointer">
            Забули пароль?
          </a>
          <button
            type="button"
            className="w-[450px] h-[55px] text-[20px] font-normal rounded-[10px] border-1 border-white flex items-center justify-center mr-[8px] cursor-pointer px-[16px] placeholder:text-white placeholder:text-[20px] bg-[#A0081F]"
          >
            Увійти через акаунт Google
          </button>
          <div className="w-[450px] flex items-center justify-center gap-[16px]">
            <div className="relative">
              <input
                type="checkbox"
                id="termsCheckbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="sr-only"
              />
              <label
                htmlFor="termsCheckbox"
                className="flex items-center justify-center w-[30px] h-[30px] rounded-[10px] border border-white cursor-pointer relative"
                style={{
                  background: isChecked ? "#fff" : "#666666",
                }}
              >
                {isChecked && (
                  <FaCheck className="text-black text-lg" size={16} />
                )}
              </label>
            </div>
            <p className="text-[13px] font-normal">
              Продовжуючи, ви приймаєте Умови надання послуг та підтверджуєте,
              що ознайомилися з нашою Політикою конфіденційності. Повідомлення.
            </p>
          </div>
          <p className="text-[16px]">
            Не маєте акаунт?{" "}
            <span
              className="font-bold cursor-pointer hover:underline"
              onClick={() => navigate("/sign-up")}
            >
              Зареєструватись
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};
