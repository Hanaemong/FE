import { FC } from "react";

interface Iprops {
  nickname: string;
  gender: string;
  msgs: string[];
  time: string;
}

const SenderChat: FC<Iprops> = ({ nickname, gender, msgs, time }) => {
  return <div></div>;
};

export default SenderChat;
