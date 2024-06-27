import { FC } from "react";

interface Iprops {
  index: number;
  score: number;
  title: string;
  onClick: (index: number, value: number) => void;
}

const SurveyCard: FC<Iprops> = ({ index, score, title, onClick }) => {
  return (
    <div className="flex flex-col gap-10">
      <p className="font-hanaRegular text-3xl">{title}</p>
      <div className="w-full flex flex-row justify-center items-center gap-8 font-hanaMedium text-2xl">
        <p>1점</p>
        <div
          className="w-10 h-20 cursor-pointer rounded-l-[2rem]
            bg-hanaPurple opacity-30"
          onClick={() => onClick(index, 1)}
        ></div>
        <div
          className={`w-10 h-20 cursor-pointer rounded-l-2xl ${
            score >= 2 ? "bg-hanaPurple opacity-50" : "bg-hanaGray2"
          } `}
          onClick={() => onClick(index, 2)}
        ></div>
        <div
          className={`w-10 h-20 cursor-pointer rounded-xl ${
            score >= 3 ? "bg-hanaPurple opacity-70" : "bg-hanaGray2"
          } `}
          onClick={() => onClick(index, 3)}
        ></div>
        <div
          className={`w-10 h-20 cursor-pointer rounded-r-2xl ${
            score >= 4 ? "bg-hanaPurple opacity-85" : "bg-hanaGray2"
          } `}
          onClick={() => onClick(index, 4)}
        ></div>
        <div
          className={`w-10 h-20 cursor-pointer rounded-r-[2rem] ${
            score === 5 ? "bg-hanaPurple opacity-100" : "bg-hanaGray2"
          } `}
          onClick={() => onClick(index, 5)}
        ></div>
        <p>5점</p>
      </div>
    </div>
  );
};

export default SurveyCard;
