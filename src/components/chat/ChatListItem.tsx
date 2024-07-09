import { FC, useEffect, useState } from "react";
import { chatFormatter } from "../../utils/datetimeFormat";
import { useNavigate } from "react-router-dom";
import { chatApi } from "../../apis/domains/chatApi";
import { teamMemberApi } from "../../apis/domains/teamMemberApi";

interface Iprops {
  title: string;
  member: number;
  date: Date;
  image: string;
  teamId: number;
  isNew: boolean;
}

const ChatListItem: FC<Iprops> = ({
  title,
  member,
  date,
  image,
  teamId,
  isNew,
}) => {
  const navigate = useNavigate();

  const [lastMsg, setLastMsg] = useState<string>();
  const [role, setRole] = useState<string>();

  const onClickItem = () => {
    if (role === "PENDING") {
      alert("가입 대기중인 모임입니다.");
      return;
    }

    navigate("/chat-room", {
      state: {
        teamId: teamId,
        memberCnt: member,
        teamName: title,
      },
    });
  };

  useEffect(() => {
    try {
      teamMemberApi
        .getInstance()
        .getMyTeamNickname(teamId)
        .then((res) => {
          setRole(res.data?.role);
          if (res.data?.role !== "PENDING") {
            chatApi
              .getInstance()
              .getLastChat(teamId)
              .then((res) => {
                setLastMsg(res.data.msg);
              });
          } else {
            setLastMsg("");
          }
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="flex flex-row w-full gap-4" onClick={() => onClickItem()}>
      {/* 이미지 영역 */}
      <div className="relative border-[1px] border-hanaPurple rounded-3xl">
        <img src={image} alt="image" className="size-24 p-2 rounded-3xl" />
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
            <p className="font-hanaMedium text-2xl max-w-80 truncate ">
              {title}
            </p>
            <p className="font-hanaRegular text-2xl text-hanaPurple opacity-50">
              {member}
            </p>
          </div>
          <p className="font-hanaMedium text-lg">{chatFormatter(date)}</p>
        </div>
        <p className="line-clamp-1 w-2/3 text-2xl text-hanaSilver2 font-hanaRegular">
          {lastMsg}
        </p>
      </div>
    </div>
  );
};

export default ChatListItem;
