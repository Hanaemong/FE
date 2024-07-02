import { useEffect, useRef, useState } from "react";
import { Button, PlanItem, Topbar } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { HiPencilSquare } from "react-icons/hi2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { teamApi } from "../../apis/domains/teamApi";

const Team = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const locationState = location.state as {
    teamId: number;
  };

  const {
    data: detail,
    error,
    isError,
  } = useQuery({
    queryKey: ["teamDetail"],
    queryFn: () => {
      const res = teamApi.getInstance().getTeamDetail(locationState.teamId);
      return res;
    },
  });

  const { mutate: joinTeam } = useMutation({
    mutationFn: ({ teamId, hello }: any) => {
      const response = teamApi.getInstance().postJoinTeam(teamId, hello);
      return response;
    },
    onSuccess: () => {
      alert("가입 신청이 완료되었습니다.");
      setRole("PENDING");
    },
    onError: (err) => {
      console.log(err.message);
      alert("가입 신청에 실패했습니다.");
    },
  });

  const [role, setRole] = useState<string | null>("");
  const [isJoined, setJoined] = useState<boolean>(true);
  const [selected, setSelected] = useState<string>("desc");
  const [modal, openModal] = useState<boolean>(false);

  const helloRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (role == null || role == "PENDING") {
      setJoined(false);
    }
  }, [role]);

  useEffect(() => {
    if (detail?.data) {
      setRole(detail.data.role);
    }
  }, [detail?.data]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["teamDetail"] });
  }, []);

  return (
    <>
      {/* 모임 가입신청 모달 */}
      {modal && (
        <div className="absolute flex flex-col items-center justify-center bg-black bg-opacity-40 w-full h-full top-0 left-0 z-50">
          <div className="flex flex-col justify-center items-center bg-white py-9 px-14 rounded-2xl gap-4 z-50">
            <div className="font-hanaMedium text-xl">
              가입인사를 작성해주세요.
            </div>
            <input
              className="px-7 py-3 rounded-2xl bg-hanaGray font-hanaRegular text-xl placeholder:text-hanaSilver2"
              placeholder="가입인사를 작성해주세요!"
              ref={helloRef}
            />
            <div className="flex gap-2 font-hanaRegular text-lg">
              <button
                className="py-3 px-9 bg-hanaGray rounded-3xl"
                onClick={() => openModal(false)}
              >
                취소
              </button>
              <button
                className="py-3 px-9 bg-hanaMint text-white rounded-3xl"
                onClick={() => {
                  openModal(false);
                  // joinTeam(locationState.teamId, helloRef.current!.value);
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
      {detail?.data && (
        <section>
          <Topbar title={detail.data.teamName} />
          <div
            className={`min-h-real-screen2 flex flex-col justify-between ${
              selected === "plan" ? "bg-hanaGray" : ""
            } `}
          >
            <div className="flex flex-col">
              {/* 모임원 or 회비내역 메뉴 */}
              {isJoined && (
                <>
                  <div className="w-full bg-custom-straight-gradient h-[1px]"></div>
                  <div className="w-full flex font-hanaMedium text-2xl py-3 text-center divide-x-2 bg-white">
                    <div
                      className="w-1/2 cursor-pointer"
                      onClick={() =>
                        navigate("/team/members", {
                          state: {
                            role: role,
                          },
                        })
                      }
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
                className="w-full flex justify-end h-80 bg-contain"
                style={{ backgroundImage: "url(/img/배드민턴.png)" }}
              >
                <HiPencilSquare
                  size={20}
                  className="text-hanaSilver2 mt-3 mr-7"
                />
              </div>
              {isJoined && (
                <>
                  {/* 내용 or 일정 메뉴 */}
                  <div className="w-full bg-custom-straight-gradient h-[1px]"></div>
                  <div className="w-full flex font-hanaMedium text-2xl py-3 text-center divide-x-2 bg-white">
                    <div
                      className={`w-1/2 cursor-pointer ${
                        selected === "desc" ? "text-hanaMint" : ""
                      }`}
                      onClick={() => setSelected("desc")}
                    >
                      내용
                    </div>
                    <div
                      className={`w-1/2 cursor-pointer ${
                        selected === "plan" ? "text-hanaPurple" : ""
                      }`}
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
                  <div className="w-full p-10 flex flex-col gap-7">
                    {/* 모임명 */}
                    <div className="text-3xl font-hanaMedium">
                      {detail.data.teamName}
                    </div>
                    {/* 모임 지역 & 카테고리 */}
                    <div className="flex gap-4">
                      <div className="bg-hanaLightMint p-1 px-3 rounded-2xl text-center text-xl font-hanaLight">
                        {detail.data.siGunGu}
                      </div>
                      <div className="bg-hanaLightMint p-1 px-3 rounded-2xl text-center text-xl font-hanaLight">
                        {detail.data.category}
                      </div>
                    </div>
                    {/* 모임 내용 */}
                    <div className="font-hanaRegular text-2xl whitespace-pre-wrap leading-10 mt-4 bg-hanaGray rounded-2xl p-7">
                      {/* 오직 방탈출만을 위한 모임 <br />
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
                      <br /> */}
                      {detail.data.teamDesc}
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
                    {role === "CHAIR" && (
                      <div
                        className="w-full flex justify-center p-12 bg-white rounded-3xl drop-shadow-lg cursor-pointer"
                        onClick={() => {
                          navigate("/create-plan");
                        }}
                      >
                        <div className="flex w-20 h-20 bg-custom-light-gradient rounded-full justify-center items-center">
                          <GoPlus color="ffffff" size={40} />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            {/* 가입하기 버튼 */}
            {!isJoined && role == null && (
              <div className="w-full flex justify-center py-5">
                <Button
                  text={role === "PENDING" ? "가입 대기중" : "가입하기"}
                  onClick={() => role !== "PENDING" && openModal(true)}
                  isActive={role !== "PENDING"}
                />
              </div>
            )}
            {selected === "desc" && role === "CHAIR" && (
              <div className="fixed flex bottom-10 right-10">
                <div className="flex w-24 h-24 bg-custom-gradient rounded-full justify-center items-center">
                  <img src="/img/qrcode.png" className="w-40" />
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Team;
