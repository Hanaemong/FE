import { FC } from "react";
import { MdFemale, MdMale } from "react-icons/md";
import { formatter2, formatter2_2 } from "../../utils/datetimeFormat";

interface Iprops {
  name: string;
  gender: string; // M or W
  balance: number;
  isDeposit: boolean;
  date: Date;
}

const DueHistoryItem: FC<Iprops> = ({
  name,
  gender,
  balance,
  isDeposit,
  date,
}) => {
  return (
    <div className="w-full h-32 flex flex-col pt-3 px-10 justify-end">
      <div className="flex flex-row justify-between pr-2">
        <div className="flex flex-row items-center pb-9">
          <img
            src={gender === "M" ? "/img/별돌이.png" : "/img/별순이.png"}
            alt="profile"
            className="w-12 h-12"
          />
          <p className="font-hanaRegular text-3xl ml-3">{name}</p>
          {gender === "M" ? (
            <MdMale color="#002CC9" size={20} />
          ) : (
            <MdFemale color="#DD0092" size={20} />
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-1 items-center">
            <p className="font-hanaRegular text-xl text-hanaSilver2 whitespace-pre">
              {formatter2(date)}
            </p>
            <p className="font-hanaLight text-xl text-hanaSilver2 whitespace-pre">
              {formatter2_2(date)}
            </p>
          </div>
          <p
            className={`font-hanaBold text-2xl text-right ${
              isDeposit ? "text-red-500" : "text-blue-500"
            }`}
          >
            {balance.toLocaleString()}원
          </p>
        </div>
      </div>
      <div className="w-full pb-[0.1rem] h-[0.5px] bg-hanaSilver" />
    </div>
  );
};

export default DueHistoryItem;
