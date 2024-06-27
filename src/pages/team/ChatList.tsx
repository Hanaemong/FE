import { useState } from "react";
import { ChatListItem, Topbar } from "../../components";

const ChatList = () => {
  const [isAll, setIsAll] = useState<boolean>(true);
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
          <ChatListItem
            title="배드민턴 동호회"
            member={20}
            date={new Date()}
            image="temp"
            lastMsg="오늘 오후에 배드민턴 치실분 성수역으로"
            teamId={1}
            isNew
          />
          <ChatListItem
            title="배드민턴 동호회"
            member={20}
            date={new Date()}
            image="temp"
            lastMsg="오늘 오후에 배드민턴 치실분 성수역으로"
            teamId={2}
            isNew
          />
          <ChatListItem
            title="배드민턴 동호회"
            member={20}
            date={new Date()}
            image="temp"
            lastMsg="오늘 오후에 배드민턴 치실분 성수역으로"
            teamId={3}
            isNew={false}
          />
          <ChatListItem
            title="배드민턴 동호회"
            member={20}
            date={new Date()}
            image="temp"
            lastMsg="오늘 오후에 배드민턴 치실분 성수역으로"
            teamId={4}
            isNew={false}
          />
        </div>
      </div>
    </section>
  );
};

export default ChatList;
