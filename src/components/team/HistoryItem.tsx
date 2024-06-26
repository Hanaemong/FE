import { FC } from "react";
import { IoIosClose } from "react-icons/io";

interface Iprops {
  index: number;
  keyword: string;
  onClick: (name: string, index: number) => void;
  onDelete: (index: number) => void;
}

const HistoryItem: FC<Iprops> = ({ index, keyword, onClick, onDelete }) => {
  return (
    <div className="flex flex-row gap-2 py-2 pl-3 pr-2 items-center border-2 border-[#A0A0A0] rounded-3xl">
      <p
        className="flex flex-row font-hanaRegular text-xl whitespace-nowrap"
        onClick={() => onClick(keyword, index)}
      >
        {keyword}
      </p>
      <IoIosClose size={20} color="#A0A0A0" onClick={() => onDelete(index)} />
    </div>
  );
};

export default HistoryItem;
