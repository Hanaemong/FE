import { FC } from "react";

interface IProps {
  title: string;
  date: string;
  place: string;
  cost: number;
  image: string;
}

const PlanItem: FC<IProps> = ({ title, date, place, cost, image }) => {
  return (
    <div className="w-full flex gap-20 p-7 bg-white rounded-3xl drop-shadow-lg">
      <div className="flex flex-col gap-4">
        <div className="font-hanaMedium text-3xl">{title}</div>
        <div
          className="w-40 h-24 rounded-2xl bg-cover bg-center"
          style={{ backgroundImage: "url(/img/뱁새.png)" }}
        ></div>
      </div>
      <div className="w-64 mt-10 flex flex-col gap-3 font-hanaRegular text-xl">
        <div className="flex justify-between">
          <div className="text-hanaSilver2">일시</div>
          <div className="text-right">{date}</div>
        </div>
        <div className="w-full flex justify-between truncate">
          <p className="text-hanaSilver2">장소</p>
          <p className="text-right w-48 truncate">{place}</p>
        </div>
        <div className="flex justify-between">
          <div className="text-hanaSilver2">비용</div>
          <div className="text-right">{cost.toLocaleString()}원</div>
        </div>
      </div>
    </div>
  );
};

export default PlanItem;