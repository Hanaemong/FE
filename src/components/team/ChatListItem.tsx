import { FC } from "react";
import { chatFormatter } from "../../utils/datetimeFormat";
import { useNavigate } from "react-router-dom";

interface Iprops {
  title: string;
  member: number;
  lastMsg: string;
  date: Date;
  image: string;
  teamId: number;
  isNew: boolean;
}

const ChatListItem: FC<Iprops> = ({
  title,
  member,
  lastMsg,
  date,
  teamId,
  isNew,
}) => {
  const navigate = useNavigate();

  const onClickItem = () => {
    navigate("/chat-room", {
      state: {
        teamId: teamId,
      },
    });
  };

  return (
    <div className="flex flex-row w-full gap-6" onClick={() => onClickItem()}>
      {/* 이미지 영역 */}
      <div className="relative border-[1px] border-hanaPurple rounded-3xl">
        <img src="/img/vip.png" alt="image" className="w-28 h-28 p-2" />
        {isNew && (
          <div className="flex absolute right-1 top-1 justify-center items-center w-7 h-7 bg-red-500 text-white rounded-full font-hanaCM">
            N
          </div>
        )}
      </div>
      {/* 이미지 우측 영역 */}
      <div className="w-3/4 flex flex-col gap-3 py-3">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <p className="font-hanaMedium text-3xl">{title}</p>
            <p className="font-hanaRegular text-2xl text-hanaPurple opacity-50">
              {member}
            </p>
          </div>
          <p className="font-hanaMedium text-xl">{chatFormatter(date)}</p>
        </div>
        <p className="line-clamp-1 w-2/3 text-2xl text-hanaSilver2 font-hanaRegular">
          {lastMsg}
        </p>
      </div>
    </div>
  );
};

export default ChatListItem;
