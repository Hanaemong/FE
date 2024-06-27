import { FC } from "react";
import { formatter } from "../../utils/datetimeFormat";

interface Iprops {
  idx: number;
  title: string;
  content: string;
  date: Date;
  onClick?: () => void;
}

const AlarmItem: FC<Iprops> = ({ idx, title, content, date, onClick }) => {
  return (
    <div
      className="flex flex-col mt-10 gap-5"
      onClick={() => {
        onClick && onClick();
      }}
    >
      <div className="flex flex-row justify-between">
        <p className="text-3xl font-hanaBold line-clamp-1">{title}</p>
        <p className="text-2xl font-hanaLight">{formatter(date)}</p>
      </div>
      <span className="text-2xl font-hanaRegular w-3/4 line-clamp-3">
        {content}
      </span>
      <div className="w-full bg-gray-200 h-[0.1rem]"></div>
    </div>
  );
};

export default AlarmItem;
