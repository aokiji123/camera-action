import { FaCheck, FaChevronDown } from "react-icons/fa";
import background from "../assets/auth-bg.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../shared/api/authService";
import { useAuth } from "../shared/context/AuthContext";

export const SignUp = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [isChecked, setIsChecked] = useState(false);
  const [day, setDay] = useState("01");
  const [month, setMonth] = useState("Грудень");
  const [year, setYear] = useState("2025");
  const [showDayDropdown, setShowDayDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const days = Array.from({ length: 31 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const months = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ];
  const years = Array.from({ length: 100 }, (_, i) => String(2025 - i));

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Будь ласка, заповніть всі поля");
      return;
    }

    if (password !== confirmPassword) {
      setError("Паролі не співпадають");
      return;
    }

    if (!isChecked) {
      setError("Будь ласка, прийміть умови користування");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      await register({
        name: `${firstName} ${lastName}`,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      // Update authentication state
      await refreshUser();

      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Помилка реєстрації");
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
        className="absolute top-[250px] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center font-ysabeau text-white w-[560px] min-h-[850px] p-[36px] rounded-[20px] border-1 border-white"
        style={{
          background: "rgba(255, 255, 255, 0.2)",
        }}
      >
        <p className="text-[45px] font-extrabold text-center leading-[60px] uppercase mb-[36px]">
          Зареєструватись
        </p>
        {error && (
          <p className="text-red-500 mb-4 text-center w-full">{error}</p>
        )}
        <form
          className="flex flex-col items-center justify-center gap-[24px]"
          onSubmit={handleRegister}
        >
          <input
            type="text"
            placeholder="Ім'я"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-[450px] h-[55px] text-[20px] font-normal rounded-[10px] border-1 border-white flex items-center justify-center mr-[8px] px-[16px] placeholder:text-[#BFBFBF] placeholder:text-[20px] bg-transparent"
          />
          <input
            type="text"
            placeholder="Прізвище"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-[450px] h-[55px] text-[20px] font-normal rounded-[10px] border-1 border-white flex items-center justify-center mr-[8px] px-[16px] placeholder:text-[#BFBFBF] placeholder:text-[20px] bg-transparent"
          />
          <div className="flex flex-col gap-[8px]">
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[450px] h-[55px] text-[20px] font-normal rounded-[10px] border-1 border-white flex items-center justify-center mr-[8px] px-[16px] placeholder:text-[#BFBFBF] placeholder:text-[20px] bg-transparent"
            />
            <p className="text-[20px] font-bold">Підтвердити пароль</p>
            <input
              type="password"
              placeholder="Повторіть пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-[450px] h-[55px] text-[20px] font-normal rounded-[10px] border-1 border-white flex items-center justify-center mr-[8px] px-[16px] placeholder:text-[#BFBFBF] placeholder:text-[20px] bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-[8px] w-full">
            <p className="text-[20px] font-bold">Дата народження</p>
            <div className="flex justify-between gap-[10px]">
              {/* Day dropdown */}
              <div className="relative">
                <button
                  type="button"
                  className="min-w-[70px] h-[55px] text-[20px] font-semibold rounded-[10px] border border-white flex items-center justify-center gap-2 px-[16px] bg-transparent cursor-pointer"
                  onClick={() => setShowDayDropdown(!showDayDropdown)}
                >
                  {day}
                  <FaChevronDown size={12} />
                </button>
                {showDayDropdown && (
                  <div className="absolute top-full left-0 w-[110px] max-h-[200px] overflow-y-auto z-10 bg-[#333] border border-white rounded-[10px] mt-1">
                    {days.map((d) => (
                      <div
                        key={d}
                        className="px-4 py-2 cursor-pointer hover:bg-[#444]"
                        onClick={() => {
                          setDay(d);
                          setShowDayDropdown(false);
                        }}
                      >
                        {d}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Month dropdown */}
              <div className="relative">
                <button
                  type="button"
                  className="min-w-[115px] h-[55px] text-[20px] font-semibold rounded-[10px] border border-white flex items-center justify-center gap-2 px-[16px] bg-transparent cursor-pointer"
                  onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                >
                  {month}
                  <FaChevronDown size={12} />
                </button>
                {showMonthDropdown && (
                  <div className="absolute top-full left-0 w-full max-h-[200px] overflow-y-auto z-10 bg-[#333] border border-white rounded-[10px] mt-1">
                    {months.map((m) => (
                      <div
                        key={m}
                        className="px-4 py-2 cursor-pointer hover:bg-[#444]"
                        onClick={() => {
                          setMonth(m);
                          setShowMonthDropdown(false);
                        }}
                      >
                        {m}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Year dropdown */}
              <div className="relative">
                <button
                  type="button"
                  className="min-w-[90px] h-[55px] text-[20px] font-semibold rounded-[10px] border border-white flex items-center justify-center gap-2 px-[16px] bg-transparent cursor-pointer"
                  onClick={() => setShowYearDropdown(!showYearDropdown)}
                >
                  {year}
                  <FaChevronDown size={12} />
                </button>
                {showYearDropdown && (
                  <div className="absolute top-full left-0 w-[110px] max-h-[200px] overflow-y-auto z-10 bg-[#333] border border-white rounded-[10px] mt-1">
                    {years.map((y) => (
                      <div
                        key={y}
                        className="px-4 py-2 cursor-pointer hover:bg-[#444]"
                        onClick={() => {
                          setYear(y);
                          setShowYearDropdown(false);
                        }}
                      >
                        {y}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[8px] w-full">
            <p className="text-[20px] font-bold">Електронна пошта</p>
            <input
              type="email"
              placeholder="Електронна пошта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[450px] h-[55px] text-[20px] font-normal rounded-[10px] border-1 border-white flex items-center justify-center mr-[8px] px-[16px] placeholder:text-[#BFBFBF] placeholder:text-[20px] bg-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-[450px] h-[55px] text-[20px] font-normal rounded-[10px] border-1 border-white flex items-center justify-center mr-[8px] cursor-pointer px-[16px] placeholder:text-white placeholder:text-[20px] bg-[#A0081F] disabled:opacity-70"
          >
            {isLoading ? "Завантаження..." : "Зареєструватись"}
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
            Вже маєте акаунт?{" "}
            <span
              className="font-bold cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Увійти
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};
