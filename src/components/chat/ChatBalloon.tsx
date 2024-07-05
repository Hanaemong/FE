import { FC } from "react";

interface Iprops {
  msg: string;
  isSend: boolean;
}

const ChatBalloon: FC<Iprops> = ({ msg, isSend }) => {
  return (
    <div
      className={`w-max-[10rem] font-hanaMedium text-2xl rounded-2xl ${
        isSend ? "bg-hanaSilver2" : "bg-hanaPurple"
      }`}
    >
      {msg}
    </div>
  );
};

export default ChatBalloon;
