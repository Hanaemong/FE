import React, { useState } from "react";
import { Button, PlanItem, Topbar } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";

const Team = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as {
    teamId: number;
  };

  const [isJoined, setJoined] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("desc");

  return (
    <section>
      <Topbar title="소소한 문화생활" />
      <div
        className={`min-h-real-screen2 ${
          selected === "plan" ? "bg-hanaGray" : ""
        } `}
      >
        {/* 모임원 or 회비내역 메뉴 */}
        {isJoined && (
          <>
            <div className="w-full bg-custom-straight-gradient h-[1px]"></div>
            <div className="w-full flex font-hanaMedium text-2xl py-3 text-center divide-x-2 bg-white">
              <div
                className="w-1/2 cursor-pointer"
                onClick={() => navigate("/team/members")}
              >
                모임원
              </div>
              <div
                className="w-1/2 cursor-pointer"
                onClick={() => navigate("/team/dues")}
              >
                회비내역
              </div>
            </div>
            <div className="w-full bg-custom-straight-gradient h-[1px]"></div>
          </>
        )}
        {/* 배너 */}
        <div
          className="w-full h-80 bg-contain"
          style={{ backgroundImage: "url(/img/배드민턴.png)" }}
        ></div>
        {isJoined && (
          <>
            {/* 내용 or 일정 메뉴 */}
            <div className="w-full bg-custom-straight-gradient h-[1px]"></div>
            <div className="w-full flex font-hanaMedium text-2xl py-3 text-center divide-x-2 bg-white">
              <div
                className="w-1/2 cursor-pointer"
                onClick={() => setSelected("desc")}
              >
                내용
              </div>
              <div
                className="w-1/2 cursor-pointer"
                onClick={() => setSelected("plan")}
              >
                일정
              </div>
            </div>
            <div className="w-full bg-custom-straight-gradient h-[1px]"></div>
          </>
        )}
        {selected == "desc" && (
          <>
            <div className="w-full p-7 flex flex-col gap-4">
              {/* 모임명 */}
              <div className="text-3xl font-hanaMedium">소소한 문화생활</div>
              {/* 모임 지역 & 카테고리 */}
              <div className="flex gap-4">
                <div className="bg-hanaLightMint p-1 px-3 rounded-2xl text-center text-hanaSilver2 font-hanaLight">
                  영등포구
                </div>
                <div className="bg-hanaLightMint p-1 px-3 rounded-2xl text-center text-hanaSilver2 font-hanaLight">
                  문화/공연
                </div>
              </div>
              {/* 모임 내용 */}
              <div className="font-hanaRegular text-lg">
                오직 방탈출만을 위한 모임 <br />
                <br /> 방탈출을 하고 싶은데 같이 갈 사람이 없으신 분!
                <br /> 인생테마 방탈출을 하고 싶으신 분! <br />
                같이 모여서 방탈출해요 🤩🤩🤩🤩🤩
                <br />
                <br /> #판타지 #감성 #코믹 #스릴러 #공포 #문제방
                <br /> #다양한 테마 #크라임씬 #클라이밍
                <br />
                <br /> 방탈출 후 커피👀 나 맥주 🍺 한 잔하면서 같이
                <br /> 얘기도 나눠요
                <br />
                <br /> 방탈출이 메인이지만
                <br /> 보드게임, 볼링, 영화 등 다양한 활동 OK
                <br />
                <br /> ❗️❗️ 가입 조건 ❗️❗️ <br />
                91년생 ~00년생
                <br /> 같이 꽃밭길을 걸으실 분 환영
                <br /> 방탈출 처음 해보는 사람도 환영
                <br />
                <br /> 🚫 테마 내용 스포금지
                <br /> 🚫 연애목적으로 가입 금지 <br />
                🚫 한 달에 한번 참여 하지 않을 시 강퇴
                <br />
              </div>
            </div>
          </>
        )}
        {/* 일정 */}
        {selected === "plan" && (
          <>
            <div className="w-full p-7 flex flex-col gap-4 ">
              <p className="font-hanaMedium text-2xl">일정</p>
              <PlanItem
                title="배드민턴 모임"
                date="6/22(토) 16:00"
                place="성수역 2번 출구"
                cost={15000}
                image="temp"
              />
              <PlanItem
                title="맛집 탐방"
                date="6/29(토) 16:00"
                place="을지로 입구역 3번 출구"
                cost={15000}
                image="temp"
              />
              {/* 일정 추가 버튼 */}
              <div
                className="w-full flex justify-center p-12 bg-white rounded-3xl drop-shadow-lg cursor-pointer"
                onClick={() => {}}
              >
                <div className="flex w-20 h-20 bg-custom-light-gradient rounded-full justify-center items-center">
                  <GoPlus color="ffffff" size={40} />
                </div>
              </div>
            </div>
          </>
        )}
        {/* 가입하기 버튼 */}
        {!isJoined && (
          <div className="w-full flex justify-center py-5">
            <Button text="가입하기" onClick={() => setJoined(true)} />
          </div>
        )}
        {isJoined && selected === "desc" && (
          <div className="fixed flex bottom-20 right-10">
            <div className="flex w-24 h-24 bg-custom-gradient rounded-full justify-center items-center">
              <img src="/img/qrcode.png" className="w-40" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;
