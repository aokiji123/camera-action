type Question = {
  id: number;
  question: string;
  answer: string;
};

const questions: Question[] = [
  {
    id: 1,
    question: "Як оформити підписку?",
    answer:
      'Щоб почати користуватися платформою, натисніть "Зареєструватися", введіть електронну пошту та оберіть тарифний план. Перший місяць безкоштовно!',
  },
  {
    id: 2,
    question: "Чи можна дивитися фільми без інтернету?",
    answer:
      "Так! Ми надаємо можливість завантажувати контент та переглядати його в офлайн-режимі.",
  },
  {
    id: 3,
    question: "Які новинки доступні цього місяця?",
    answer:
      "Щомісяця ми додаємо найпопулярніші новинки кіно, серіалів та аніме.",
  },
  {
    id: 4,
    question: "На яких пристроях працює платформа?",
    answer:
      "Сервіс доступний на Windows, macOS, iOS, Android, а також Smart TV",
  },
  {
    id: 5,
    question: "Чи можна скасувати підписку?",
    answer:
      "Так, ви можете скасувати підписку будь-коли в налаштуваннях облікового запису.",
  },
];

export const FAQ = () => {
  return (
    <div className="p-[24px] flex flex-col items-center gap-[24px]">
      <p className="text-[32px] text-white font-ysabeau font-bold px-[12px]">
        Найпопулярніші запитання
      </p>

      <div className="w-full flex flex-wrap gap-[24px] px-[12px] items-center justify-center mb-[36px]">
        {questions.map((question) => (
          <FAQItem key={question.id} {...question} />
        ))}
      </div>

      <input
        type="text"
        placeholder="Задати своє питання"
        className="w-[80%] h-[80px] rounded-[28px] px-[36px] py-[12px] border-1 border-white text-white text-[32px] font-ysabeau font-normal placeholder:text-gray-500 placeholder:text-[32px] placeholder:font-ysabeau placeholder:font-normal"
      />
    </div>
  );
};

const FAQItem: React.FC<Question> = (question) => {
  return (
    <div className="w-full rounded-[28px] px-[36px] py-[12px] border-1 border-white">
      <p className="text-[32px] text-white font-ysabeau font-bold">
        {question.question}
      </p>
      <p className="text-[32px] text-white font-ysabeau font-normal">
        {question.answer}
      </p>
    </div>
  );
};
