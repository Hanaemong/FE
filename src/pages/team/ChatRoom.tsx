import { useEffect, useRef, useState } from "react";
import { ChatCard, ChatTopbar } from "../../components";
import { toChatArr } from "../../utils/chatUtils";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { chatApi } from "../../apis/domains/chatApi";
import SockJS from "sockjs-client";
import { timeConvertor } from "../../utils/datetimeFormat";
import { teamMemberApi } from "../../apis/domains/teamMemberApi";

const ChatRoom = () => {
  const client = useRef<CompatClient>();
  const divRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [lastTime, setLastTime] = useState<string>();
  const [lastSender, setLastSender] = useState<string>();
  const [oldMsg, setOldMsg] = useState<ChatType[][]>();
  const [message, setMessage] = useState<ChatType>();
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [myNickname, setMyNickname] = useState<string>("");
  const [myProfile, setMyProfile] = useState<string>("");

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

  const disconnectHandler = () => {
    if (client.current && client.current.connected) {
      client.current.disconnect(() => {
        console.log("Disconnected");
      });
    }
  };

  const sendHandler = () => {
    if (textareaRef.current!.value === "") return;

    const chatDto = {
      nickname: myNickname,
      roomId: 2,
      profile: myProfile,
      msg: textareaRef.current!.value,
      time: new Date().toISOString(), // ISO 형식으로 변환
      type: "chat",
    };
    client.current!.send("/pub/send", {}, JSON.stringify(chatDto));
    textareaRef.current!.value = "";
    textareaRef.current!.style.height = "auto";
    scrollToBottom();
  };

  useEffect(() => {
    divRef.current &&
      (divRef.current.scrollTop =
        divRef.current.scrollHeight - divRef.current.clientHeight);
    try {
      teamMemberApi
        .getInstance()
        .getMyTeamNickname(2)
        .then((res) => {
          setMyNickname(res.data?.nickname!);
          setMyProfile(res.data?.profile!);
          chatApi
            .getInstance()
            .getChatHistory(2)
            .then((res) => {
              console.log(res.data);
              setOldMsg(toChatArr(res.data));
            });
        });
    } catch (err) {
      console.log(err);
    }
    connectHandler();

    // cleanUp
    return () => {
      disconnectHandler();
    };
  }, []);

  useEffect(() => {
    if (oldMsg && oldMsg.length !== 0) {
      setLastSender(oldMsg[oldMsg.length - 1][0].nickname);
      setLastTime(timeConvertor(new Date(oldMsg[oldMsg.length - 1][0].time)));
      console.log(oldMsg);
      setIsTyping(!isTyping);
    }
  }, [oldMsg]);

  useEffect(() => {
    if (message) {
      console.log(message);
      let newMsg = [...oldMsg!];
      if (
        message.nickname === lastSender &&
        timeConvertor(new Date(message.time)) == lastTime
      ) {
        newMsg[newMsg.length - 1].push(message);
        setOldMsg(newMsg);
      } else {
        newMsg.push(new Array(message));
        setOldMsg(newMsg);
        setLastSender(message.nickname);
        setLastTime(timeConvertor(new Date(message.time)));
      }
      setIsTyping(!isTyping);
      scrollToBottom();
    }
  }, [message]);

  useEffect(() => {
    textareaRef.current &&
      (textareaRef.current.scrollTop =
        textareaRef.current.scrollHeight - textareaRef.current.clientHeight);
  }, [textareaRef.current?.scrollHeight]);

  useEffect(() => {
    scrollToBottom();
  }, [isTyping]);

  const scrollToBottom = () => {
    if (divRef.current) {
      console.log(
        divRef.current.scrollTop,
        divRef.current.scrollHeight,
        divRef.current.clientHeight
      );
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  };

  const activeEnter = (e: any) => {
    if (e.key === "Enter") {
      textareaRef.current!.value && sendHandler();
      e.preventDefault();
    }
  };

  return (
    <section ref={divRef}>
      <ChatTopbar title="배드민턴 동호회" member={20} teamId={1} />
      <div className="min-h-real-screen4 flex flex-col">
        {/* 채팅리스트 구현 필요 */}
        <div className="flex flex-col p-7 gap-7">
          {oldMsg?.map((item, index) => (
            <ChatCard
              key={index}
              isSender={item[0].nickname == myNickname}
              nickname={item[0].nickname != myNickname ? item[0].nickname : ""}
              profile={item[0].profile}
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
          onKeyDown={(e) => activeEnter(e)}
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
