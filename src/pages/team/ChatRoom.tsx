import { ChatBalloon, ChatTopbar } from "../../components";

const ChatRoom = () => {
  return (
    <section className="min-h-real-screen2">
      <ChatTopbar title="배드민턴 동호회" member={20} teamId={1} />
      <div className="w-full bg-custom-light-gradient h-[0.15rem]"></div>
      {/* 채팅리스트 구현 필요 */}
      <div className="flex flex-col p-10">
        <ChatBalloon msg="ㅎㅇ" isSend />
      </div>
    </section>
  );
};

export default ChatRoom;
