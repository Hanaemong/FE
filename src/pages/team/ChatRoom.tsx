import { useEffect, useRef, useState } from "react";
import { ChatCard, ChatTopbar } from "../../components";
import { toChatArr } from "../../utils/chatUtils";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { chatApi } from "../../apis/domains/chatApi";
import SockJS from "sockjs-client";

const myNickname = "도라에몽";
const genderMap = new Map();
genderMap.set("도라에몽", "M");
genderMap.set("도라미", "W");
genderMap.set("별돌이", "M");

const ChatRoom = () => {
  const client = useRef<CompatClient>();
  const divRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [lastTime, setLastTime] = useState<string>();
  const [lastSender, setLastSender] = useState<string>();
  const [oldMsg, setOldMsg] = useState<ChatType[][]>();
  const [message, setMessage] = useState();

  const handleResizeHeight = () => {
    // textarea 높이 재조정
    textareaRef.current!.style.height = "auto";
    textareaRef.current!.style.height =
      textareaRef.current!.scrollHeight + "px";
    // 채팅리스트 높이 재조정
    // divRef.current!.style.height = "auto";
    // divRef.current!.style.height =
    //   divRef.current!.scrollHeight - textareaRef.current!.scrollHeight + "px";
  };

  const connectHandler = () => {
    if (client.current && client.current.connected) return;

    client.current = Stomp.over(() => {
      const sock = new SockJS(import.meta.env.VITE_WS_URL);
      return sock;
    });
    client.current.connect({}, () => {
      client.current &&
        client.current.subscribe(`/topic/${2}`, (message: any) => {
          console.log("메세지:", message);
          setMessage(JSON.parse(message.body));
        });
    });
  };

  const sendHandler = () => {
    const chatDto = {
      nickname: "별돌이",
      roomId: 2,
      msg: "채팅내용",
      time: new Date().toISOString(), // ISO 형식으로 변환
      type: "chat",
    };
    client.current!.send("/pub/send", {}, JSON.stringify(chatDto));
  };

  useEffect(() => {
    divRef.current &&
      (divRef.current.scrollTop =
        divRef.current.scrollHeight - divRef.current.clientHeight);
    try {
      chatApi
        .getInstance()
        .getChatHistory(2)
        .then((res) => {
          console.log(res.data);
          setOldMsg(toChatArr(res.data));
        });
    } catch (err) {
      console.log(err);
    }
    connectHandler();
  }, []);

  useEffect(() => {
    if (oldMsg && oldMsg.length !== 0) {
      setLastSender(oldMsg[oldMsg.length - 1][0].nickname);
      setLastTime(oldMsg[oldMsg.length - 1][0].time);
      console.log(oldMsg);
    }
  }, [oldMsg]);

  useEffect(() => {
    if (message) {
      console.log(message);
    }
  }, [message]);

  // useEffect(() => {
  //   textareaRef.current &&
  //     (textareaRef.current.scrollTop =
  //       textareaRef.current.scrollHeight - textareaRef.current.clientHeight);
  // }, [textareaRef.current]);

  return (
    <section>
      <ChatTopbar title="배드민턴 동호회" member={20} teamId={1} />
      <div className="min-h-real-screen4 flex flex-col">
        {/* 채팅리스트 구현 필요 */}
        <div className="flex flex-col p-7 gap-7" ref={divRef}>
          {oldMsg?.map((item, index) => (
            <ChatCard
              key={index}
              isSender={item[0].nickname == myNickname}
              nickname={item[0].nickname != myNickname ? item[0].nickname : ""}
              gender={genderMap.get(item[0].nickname)}
              msgs={item}
            />
          ))}
        </div>
      </div>
      <div className="sticky mb-4 flex justify-center items-center">
        <textarea
          maxLength={100}
          rows={1}
          onChange={() => handleResizeHeight()}
          ref={textareaRef}
          className={`bg-[#D9D9D9] bottom-4 w-11/12 font-hanaRegular text-xl focus:outline-none py-4 pl-4 pr-14 rounded-3xl overflow-y-hidden`}
        />
        <div
          className="absolute right-9 text-hanaPurple text-2xl font-hanaMedium"
          onClick={() => sendHandler()}
        >
          전송
        </div>
      </div>
    </section>
  );
};

export default ChatRoom;
