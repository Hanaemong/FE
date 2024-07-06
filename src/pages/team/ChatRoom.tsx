import { useEffect, useRef } from "react";
import { ChatCard, ChatTopbar } from "../../components";
import { dummy, toChatArr } from "../../utils/chatUtils";

const temp = toChatArr(dummy);
const myNickname = "도라에몽";
const genderMap = new Map();
genderMap.set("도라에몽", "M");
genderMap.set("도라미", "W");
genderMap.set("별돌이", "M");

const ChatRoom = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const textBoxRef = useRef<HTMLDivElement | null>(null);

  const handleResizeHeight = () => {
    // textarea 높이 재조정
    textareaRef.current!.style.height = "auto";
    textareaRef.current!.style.height =
      textareaRef.current!.scrollHeight + "px";
    // 채팅리스트 높이 재조정
    // divRef.current!.style.height = "auto";
    // divRef.current!.style.height =
    //   divRef.current!.scrollHeight - textBoxRef.current!.scrollHeight + "px";
  };

  useEffect(() => {
    divRef.current &&
      (divRef.current.scrollTop =
        divRef.current.scrollHeight - divRef.current.clientHeight);
  }, []);

  return (
    <section>
      <ChatTopbar title="배드민턴 동호회" member={20} teamId={1} />
      <div className="min-h-real-screen4 flex flex-col">
        {/* 채팅리스트 구현 필요 */}
        <div className="flex flex-col p-7 gap-7" ref={divRef}>
          {temp.map((item) => (
            <ChatCard
              isSender={item[0].nickname == myNickname}
              nickname={item[0].nickname != myNickname ? item[0].nickname : ""}
              gender={genderMap.get(item[0].nickname)}
              msgs={item}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <textarea
          rows={2}
          onChange={() => handleResizeHeight()}
          ref={textareaRef}
          className="bg-[#D9D9D9] sticky bottom-0 w-11/12 h-12 font-hanaRegular text-xl focus:border-0 flex flex-row justify-end"
        >
          <div className="text-hanaPurple text-2xl font-hanaMedium">전송</div>
        </textarea>
      </div>
    </section>
  );
};

export default ChatRoom;
