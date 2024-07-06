import { FC } from "react";
import ChatBalloon from "./ChatBalloon";

interface Iprops {
  msgs: ChatType[];
  isSender: boolean;
  gender?: string;
  nickname?: string;
}

const ChatCard: FC<Iprops> = ({ msgs, isSender, nickname, gender }) => {
  return (
    <div className={`flex flex-row gap-4 w-full ${isSender && "justify-end"}`}>
      {nickname && (
        <img
          src={gender == "M" ? "/img/별돌이.png" : "/img/별순이.png"}
          alt="profile"
          className="size-16"
        ></img>
      )}
      <div className={`flex flex-col gap-2 ${isSender && "items-end"}`}>
        {nickname && <p className="font-hanaMedium text-2xl">{nickname}</p>}
        {msgs.map((item, index) => (
          <ChatBalloon
            isSend={!!!nickname}
            msg={item.msg}
            time={item.time}
            isLast={index == msgs.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatCard;
