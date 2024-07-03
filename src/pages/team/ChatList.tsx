import { useEffect, useState } from "react";
import { ChatListItem, Topbar } from "../../components";
import { useQuery } from "@tanstack/react-query";
import { teamApi } from "../../apis/domains/teamApi";

const ChatList = () => {
  const [isAll, setIsAll] = useState<boolean>(true);

  const {
    data: list,
    error,
    isError,
  } = useQuery({
    queryKey: ["list"],
    queryFn: () => {
      const res = teamApi.getInstance().getMyTeam();
      return res;
    },
  });

  useEffect(() => {
    if (isError) {
      console.log(error.message);
      alert("채팅방을 불러오는 데 실패했습니다.");
    }
  }, [isError]);

  return (
    <section className="min-h-real-screen3">
      <Topbar title="내 채팅" prohibit />
      <div className="w-full bg-custom-light-gradient h-[0.15rem]"></div>
      <div className="flex flex-col px-7 py-10">
        {/* 종류 선택 영역 */}
        <div className="flex flex-row gap-4">
          <div
            className={`py-2 px-5 flex justify-center items-center text-2xl font-hanaMedium rounded-[2.5rem] cursor-pointer ${
              isAll ? "text-white bg-hanaBlue" : "border-2 border-hanaBlue"
            } `}
            onClick={() => !isAll && setIsAll(true)}
          >
            전체
          </div>
          <div
            className={`py-2 px-5 flex justify-center items-center text-2xl font-hanaMedium rounded-[2.5rem] cursor-pointer ${
              !isAll ? "text-white bg-hanaBlue" : "border-2 border-hanaBlue"
            } `}
            onClick={() => isAll && setIsAll(false)}
          >
            안 읽은 채팅방
          </div>
        </div>
        {/* 채팅 리스트 */}
        <div className="flex flex-col gap-7 py-10">
          {list?.data?.map((item, index) => (
            <ChatListItem
              key={index}
              title={item.teamName}
              member={item.memberCnt}
              date={new Date()}
              image={item.thumbNail}
              lastMsg="오늘 오후에 배드민턴 치실분 성수역으로"
              teamId={item.teamId}
              isNew={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChatList;
