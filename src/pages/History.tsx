import { Header } from "../shared/components/Header";
import background from "../assets/header-bg.png";
import logo from "../assets/big-logo.png";
import camera from "../assets/camerman.png";

export const History = () => {
  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="mb-[50px]">
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center font-ysabeau text-white gap-[48px]">
            <img src={logo} alt="logo" className="w-[800px] h-[420px]" />
          </div>
        </div>
        <div className="p-[24px] flex flex-col gap-[24px]">
          <p className="text-[48px] font-bold">Історія створення логотипу</p>
          <p className="text-[32px]">
            Одного разу група ентузіастів кіно та аніме вирішила створити
            унікальний стрімінговий сервіс, де кожен міг би знайти улюблені
            фільми, серіали та аніме. Вони знали, що для успіху потрібен не лише
            якісний контент, а й впізнаваний стиль. Так народилася ідея
            створення логотипу КамераAction.
          </p>
          <p className="text-[48px] font-bold">Пошук ідеї</p>
          <p className="text-[32px]">
            Команда хотіла, щоб логотип передавав динаміку, емоції та магію
            кіно. Назва КамераAction поєднувала два важливих елементи –
            кінокамеру, яка символізує зйомку, і слово Action, що відсилає до
            легендарної фрази режисерів: "Камера! Мотор! Action!"
          </p>
          <p className="text-[48px] font-bold">Процес дизайну</p>
          <p className="text-[32px]">
            Спочатку розглядали класичні варіанти – плівкову камеру, кінокадри,
            але все це здавалося банальним. Тоді один із дизайнерів запропонував
            сміливий підхід: поєднати стилістику кінематографа з динамікою
            сучасних медіа.
          </p>
          <p className="text-[48px] font-bold">Фінал</p>
          <p className="text-[32px]">
            Після численних варіацій і тестів команда обрала варіант, який
            найбільше передавав дух платформи: динамічний, стильний,
            кінематографічний логотип, що асоціюється з драйвом кіноіндустрії.
            Так КамераAction став не просто назвою, а символом швидкого доступу
            до найкращого контенту. Тепер кожен, хто бачить цей логотип, знає –
            тут на нього чекає емоції, які варто прожити разом із улюбленими
            фільмами, аніме та серіалами!
          </p>
          <p className="text-[48px] font-bold">Наш корпоративний герой</p>
          <p className="text-[32px] w-[60%]">
            Містер Камерамен або просто Стів, кінокамера у відставці, що любить
            дивитися чудові фільми в хорошій компанії, хороший бро завжди
            пригостить вас попкорном і порадить хороший фільм. Він буде
            супроводжувати вас під час перегляду та даватиме поради, або
            розказуватиме цікаві факти про персонажів ваших улюблених персонажів
            кінофільмів, серіалів та аніме , може порадити книгу, чи мангу, якщо
            ви полюбляєте заглиблюватися в сюжет та історію з головою.
          </p>
        </div>
      </div>
      <img
        src={camera}
        alt="camera"
        className="w-[650px] h-[650px] absolute bottom-0 right-0"
      />
    </div>
  );
};
