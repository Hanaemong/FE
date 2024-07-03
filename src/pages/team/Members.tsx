import { useState } from "react";
import { Button, MemberItem, Topbar } from "../../components";
import { useLocation } from "react-router-dom";

const Members = () => {
  const location = useLocation();

  const locationState = location.state as {
    role: string;
  };

  const [changeBtn, setChangeBtn] = useState<boolean>(false);

  return (
    <section>
      <Topbar title="모임원" />
      <div className="min-h-real-screen2 flex flex-col justify-between">
        <div className="flex flex-col p-7 gap-10">
          {/* 모임 멤버수 */}
          <div className="font-hanaBold text-2xl pb-2 border-b-2 border-hanaGray">
            4명 참여중
          </div>
          {/* 모임 총무 */}
          <div className="flex flex-col">
            <div className="font-hanaBold text-2xl">총무</div>
            <MemberItem
              name="안나영"
              gender="F"
              role="총무"
              changeBtn={changeBtn}
              setChangeBtn={setChangeBtn}
              isChair={locationState.role === "CHAIR"}
            />
          </div>
          {/* 모임 가입 요청 */}
          {locationState.role === "CHAIR" && (
            <div className="flex flex-col mb-7">
              <div className="font-hanaBold text-2xl">대기중</div>
              <div className="flex flex-col gap-3">
                <MemberItem name="신명지" gender="F" role="가입요청" />
                <MemberItem name="신명지" gender="F" role="가입요청" />
              </div>
            </div>
          )}
          {/* 모임원 목록 */}
          <div className="flex flex-col">
            <div className="font-hanaBold text-2xl">모임원</div>
            <div className="flex flex-col gap-3">
              <MemberItem
                name="김현우"
                gender="M"
                role="모임원"
                changeBtn={changeBtn}
                isChair={locationState.role === "CHAIR"}
              />
              <MemberItem
                name="김지윤"
                gender="F"
                role="모임원"
                changeBtn={changeBtn}
                isChair={locationState.role === "CHAIR"}
              />
              <MemberItem
                name="정건우"
                gender="M"
                role="모임원"
                changeBtn={changeBtn}
                isChair={locationState.role === "CHAIR"}
              />
              {locationState.role !== "CHAIR" && (
                <p className="w-full text-end text-xl font-hanaMedium underline underline-offset-2 text-hanaSilver2 mt-7 pr-3">
                  탈퇴하기
                </p>
              )}
            </div>
          </div>
        </div>
        {locationState.role === "CHAIR" && (
          <div className="flex flex-row justify-center mb-7">
            <Button text="설문조사 보내기" onClick={() => {}} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Members;
