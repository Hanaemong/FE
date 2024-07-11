import { useRef, useState } from "react";
import { Button, Topbar } from "../components";
import { useNavigate } from "react-router-dom";
import { chatApi } from "../apis/domains/chatApi";
import { setCookie } from "../utils/cookie";

const QnA = () => {
  const navigate = useNavigate();

  const [dupl, setDupl] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<number>(0);

  const urls = [
    "https://hanalinkbucket.s3.ap-northeast-2.amazonaws.com/image+(5).png",
    "https://hanalinkbucket.s3.ap-northeast-2.amazonaws.com/image+(2).png",
    "https://hanalinkbucket.s3.ap-northeast-2.amazonaws.com/image+(4).png",
    "https://hanalinkbucket.s3.ap-northeast-2.amazonaws.com/image+(3).png",
  ];

  const onClickDupl = () => {
    if (inputRef.current!.value.trim() == "") {
      alert("닉네임을 입력해주세요.");
      return;
    }
    try {
      chatApi
        .getInstance()
        .getNickDupl(inputRef.current!.value)
        .then((res) => {
          if (res.data) {
            setIsActive(false);
            setDupl(true);
          } else {
            setIsActive(true);
            setDupl(false);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const onClickButton = () => {
    setCookie("nickname", inputRef.current!.value);
    setCookie("profile", urls[image]);
    navigate("/chat-room", {
      state: {
        teamId: -1,
        memberCnt: 0,
        teamName: "알파코 하나링크 QnA",
      },
    });
  };

  const onChangeInput = () => {
    isActive && setIsActive(false);
  };

  return (
    <section className="border-[1px] border-hanaPurple">
      <div className="flex flex-col">
        <Topbar title="QnA" prohibit />
        <div className="w-full bg-custom-light-gradient h-[0.15rem]" />
        <div className="flex flex-col min-h-real-screen2 p-10 justify-between">
          <div className="flex flex-col mt-10 gap-32">
            {/* 닉네임 영역 */}
            <div className="flex flex-col items-center gap-4 mt-10 pr-7">
              <p className="text-3xl font-hanaRegular">닉네임</p>
              <div className="flex flex-row pl-32 items-center gap-7">
                <input
                  type="text"
                  className="p-3 w-64 h-16 border-2 border-hanaPurple text-2xl rounded-3xl"
                  maxLength={8}
                  onChange={() => onChangeInput()}
                  ref={inputRef}
                />
                <div
                  className="cursor-pointer bg-hanaPurple text-white text-xl font-hanaRegular flex items-center p-3 rounded-3xl"
                  onClick={() => onClickDupl()}
                >
                  중복검사
                </div>
              </div>
              {dupl && (
                <p className="text-xl text-red-500">
                  중복된 닉네임이 있습니다.
                </p>
              )}
            </div>
            {/* 사진 영역 */}
            <div className="flex flex-col items-center gap-4 mt-10">
              <p className="text-3xl font-hanaRegular">프로필사진</p>
              <div className="flex flex-row gap-4">
                {urls.map((item, index) => (
                  <img
                    key={index}
                    src={item}
                    alt="profile"
                    className={`p-2 cursor-pointer size-28 border-hanaPurple rounded-2xl ${
                      index === image ? "border-[3px]" : "border-[1px]"
                    }`}
                    onClick={() => setImage(index)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              text="입장"
              isActive={isActive}
              onClick={() => onClickButton()}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QnA;
