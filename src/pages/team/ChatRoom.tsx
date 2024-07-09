import { useEffect, useRef, useState } from "react";
import { ChatCard, ChatTopbar } from "../../components";
import { toChatArr } from "../../utils/chatUtils";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { chatApi } from "../../apis/domains/chatApi";
import SockJS from "sockjs-client";
import { timeConvertor } from "../../utils/datetimeFormat";
import { teamMemberApi } from "../../apis/domains/teamMemberApi";
import { useLocation } from "react-router-dom";

const ChatRoom = () => {
  const location = useLocation();
  const locationState = location.state as {
    teamId: number;
    teamName: string;
    memberCnt: number;
  };

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
  };

  const connectHandler = () => {
    if (client.current && client.current.connected) return;

    client.current = Stomp.over(() => {
      const sock = new SockJS(import.meta.env.VITE_WS_URL);
      return sock;
    });
    client.current.connect({}, () => {
      client.current &&
        client.current.subscribe(
          `/topic/${locationState.teamId}`,
          (message: any) => {
            setMessage(JSON.parse(message.body));
          }
        );
    });
  };

  const disconnectHandler = () => {
    if (client.current && client.current.connected) {
      client.current.disconnect(() => {});
    }
  };

  const sendHandler = () => {
    if (textareaRef.current!.value.trim() === "") return;

    const chatDto = {
      nickname: myNickname,
      roomId: locationState.teamId,
      profile: myProfile,
      msg: textareaRef.current!.value,
      time: new Date().toISOString(), // ISO 형식으로 변환
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
        .getMyTeamNickname(locationState.teamId)
        .then((res) => {
          setMyNickname(res.data?.nickname!);
          setMyProfile(res.data?.profile!);
          chatApi
            .getInstance()
            .getChatHistory(locationState.teamId)
            .then((res) => {
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
      setIsTyping(!isTyping);
    }
  }, [oldMsg]);

  useEffect(() => {
    if (message) {
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
    textareaRef.current && setTimeout(scrollToBottom, 0);
  }, [textareaRef.current?.scrollHeight]);

  useEffect(() => {
    scrollToBottom();
  }, [isTyping]);

  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  };

  const activeEnter = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      textareaRef.current!.value && sendHandler();
    }
  };

  return (
    <section className="relative flex flex-col h-screen">
      <ChatTopbar
        title={locationState.teamName}
        member={locationState.memberCnt}
        teamId={locationState.teamId}
      />
      <div
        className="flex-grow flex flex-col overflow-auto scrollbar-hide"
        ref={divRef}
      >
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
      <div className="sticky bottom-2 pt-4 flex justify-center items-center w-full">
        <textarea
          maxLength={100}
          rows={1}
          onChange={() => handleResizeHeight()}
          onKeyDown={(e) => activeEnter(e)}
          ref={textareaRef}
          className={`bg-[#D9D9D9] w-11/12 font-hanaRegular text-xl focus:outline-none py-4 pl-4 pr-14 rounded-3xl overflow-y-hidden`}
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
