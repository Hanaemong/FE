import { FC } from "react";
import { chatFormatter } from "../../utils/datetimeFormat";

interface Iprops {
  msg: string;
  isSend: boolean;
  time: string;
  isLast: boolean;
}

const ChatBalloon: FC<Iprops> = ({ msg, isSend, time, isLast }) => {
  return (
    <div className="flex flex-row items-end gap-3 text-lg font-hanaRegular">
      {isLast && isSend && chatFormatter(new Date(time))}
      <div
        className={`p-4 max-w-80 font-hanaRegular text-2xl rounded-3xl ${
          isSend ? "bg-hanaPurple text-white" : "bg-hanaGray2"
        }`}
      >
        {msg}
      </div>
      {isLast && !isSend && chatFormatter(new Date(time))}
    </div>
  );
};

export default ChatBalloon;
