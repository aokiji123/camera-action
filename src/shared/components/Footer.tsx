import { FaInstagram } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
import { RiTelegram2Fill } from "react-icons/ri";

export const Footer = () => {
  return (
    <div className="w-full p-[36px] mt-[64px]">
      <div className="flex items-center w-[250px] justify-between">
        <div>
          <FaInstagram size={42} className="text-white cursor-pointer" />
        </div>
        <div>
          <ImFacebook2 size={42} className="text-white cursor-pointer" />
        </div>
        <div>
          <RiTelegram2Fill size={42} className="text-white cursor-pointer" />
        </div>
      </div>

      <div className="flex w-full text-white mt-[24px] text-[20px] font-extralight">
        <div className="w-1/2 flex">
          <ul className="w-1/2">
            <li>Звуковий опис</li>
            <li>Для інвесторів</li>
            <li>Конфіденційність</li>
            <li>Зв'яжіться з нами</li>
          </ul>
          <ul className="w-1/2">
            <li>Центр підтримки</li>
            <li>Вакансії</li>
            <li>Правові положення</li>
            <li>Вибір реклами</li>
          </ul>
        </div>
        <div className="w-1/2 flex">
          <ul className="w-1/2">
            <li>Подарункові картки</li>
            <li>Магазин</li>
            <li>налаштування файлів cookie</li>
          </ul>
          <ul className="w-1/2">
            <li>Медіацентр</li>
            <li>Правила використання</li>
            <li>Імпресум</li>
          </ul>
        </div>
      </div>

      <button className="w-[180px] h-[60px] flex items-center justify-center border-1 border-white text-white text-[20px] font-extralight mt-[24px]">
        Сервісний код
      </button>

      <p className="text-white text-[20px] font-extralight mt-[24px]">
        2025 КамераAction, Inc.
      </p>
    </div>
  );
};
