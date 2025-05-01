import star from "../../assets/star.png";
import guarantee from "../../assets/guarantee.png";
import bulletedList from "../../assets/bulleted-list.png";
import multipleDevices from "../../assets/multiple-devices.png";

type Item = {
  id: number;
  title: string;
  image: string;
};

const items: Item[] = [
  {
    id: 1,
    title: "висока якість відео",
    image: guarantee,
  },
  {
    id: 2,
    title: "без реклами",
    image: star,
  },
  {
    id: 3,
    title: "дивись на будь-якому пристрої",
    image: multipleDevices,
  },
  {
    id: 4,
    title: "широкий вибір контенту",
    image: bulletedList,
  },
];
export const WhyUs = () => {
  return (
    <div className="p-[24px]">
      <p className="text-[32px] text-white font-ysabeau font-bold mb-[24px] px-[12px]">
        Чому варто обрати нас?
      </p>

      <div className="w-full flex flex-wrap gap-[24px] px-[12px] items-center justify-center">
        {items.map((item) => (
          <WhyUsItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

const WhyUsItem: React.FC<Item> = (item) => {
  return (
    <div className="bg-gradient-to-tl from-[#AC011C] via-[#63101D] to-[#0F0F0F] w-[23%] h-[260px] rounded-[28px] p-[12px]">
      <div className="flex items-center justify-center flex-col gap-[12px]">
        <img
          src={item.image}
          alt={item.title}
          className="w-[100px] h-[100px] mt-[18px]"
        />
        <p className="text-[24px] text-white font-ysabeau font-bold text-center">
          {item.title}
        </p>
      </div>
    </div>
  );
};
