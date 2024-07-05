import { useEffect, useRef, useState } from "react";
import { Button, PlanItem, Topbar } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { HiPencilSquare } from "react-icons/hi2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { teamApi } from "../../apis/domains/teamApi";
import { planApi } from "../../apis/domains/planApi";
import { TbCheckbox } from "react-icons/tb";

const Team = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const locationState = location.state as {
    teamId: number;
    from: string;
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

  const { data: plans } = useQuery({
    queryKey: ["plan"],
    queryFn: () => {
      const res = planApi.getInstance().getPlan(locationState.teamId);
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
      alert("가입 신청에 실패했습니다.");
      console.log(err.message);
    },
  });

  const { mutate: changeBanner } = useMutation({
    mutationFn: (req: { teamId: number; banner: FormData }) => {
      const response = teamApi
        .getInstance()
        .updateBanner(req.teamId, req.banner);
      return response;
    },
    onSuccess: (res) => {
      console.log(res);
      alert("배너가 수정되었습니다.");
      setAttachment("");
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  useEffect(() => {
    if (isError) {
      console.log(error.message);
      alert("모임 정보를 불러오는 데 실패했습니다.");
    }
  }, [isError]);

  const [role, setRole] = useState<string | null>("");
  const [selected, setSelected] = useState<string>("desc");
  const [modal, openModal] = useState<boolean>(false);
  const [attachment, setAttachment] = useState<string>("");
  const [file, setFile] = useState<File>(new File([], ""));
  const helloRef = useRef<HTMLInputElement | null>(null);

  const onClickBack = () => {
    navigate(`/${locationState.from}`);
  };

  useEffect(() => {
    if (detail?.data) {
      setRole(detail.data.role);
    }
  }, [detail?.data]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["teamDetail"] });
    queryClient.invalidateQueries({ queryKey: ["plan"] });
  }, []);

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    if (files.length > 0) {
      const file = files[0];
      setFile(file);
      const url = URL.createObjectURL(file);
      setAttachment(url);
    }
  };

  const clickHandler = () => {
    const formData = new FormData();
    formData.append("banner", file);
    changeBanner({ teamId: locationState.teamId, banner: formData });
  };

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
                  joinTeam({
                    teamId: locationState.teamId,
                    hello: helloRef.current!.value,
                  });
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
          <Topbar title={detail.data.teamName} onClick={() => onClickBack()} />
          <div
            className={`min-h-real-screen2 flex flex-col justify-between ${
              selected === "plan" ? "bg-hanaGray" : ""
            } `}
          >
            <div className="flex flex-col">
              {/* 모임원 or 회비내역 메뉴 */}
              {(role === "CHAIR" || role === "REGULAR") && (
                <>
                  <div className="w-full bg-custom-straight-gradient h-[1px]"></div>
                  <div className="w-full flex font-hanaMedium text-2xl py-3 text-center divide-x-2 bg-white">
                    <div
                      className="w-1/2 cursor-pointer"
                      onClick={() =>
                        navigate("/team/members", {
                          state: {
                            role: role,
                            teamId: locationState.teamId,
                            from: locationState.from,
                          },
                        })
                      }
                    >
                      모임원
                    </div>
                    <div
                      className="w-1/2 cursor-pointer"
                      onClick={() =>
                        navigate("/team/dues", {
                          state: {
                            teamId: locationState.teamId,
                          },
                        })
                      }
                    >
                      회비내역
                    </div>
                  </div>
                  <div className="w-full bg-custom-straight-gradient h-[1px]"></div>
                </>
              )}
              {/* 배너 */}
              <div
                className="w-full flex h-80 bg-contain"
                style={{
                  backgroundImage: `url(${
                    attachment ? attachment : detail.data.banner
                  })`,
                }}
              ></div>
              {(role === "CHAIR" || role === "REGULAR") && (
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
                    <div className="flex flex-row items-center justify-between w-full ">
                      <div className="text-3xl font-hanaMedium">
                        {detail.data.teamName}
                      </div>
                      {/* 배너 수정하기 버튼 */}
                      {role === "CHAIR" && (
                        <div className="flex flex-row justify-center items-center w-14 h-14">
                          {!attachment ? (
                            <label htmlFor="bannerImg">
                              <HiPencilSquare
                                size={30}
                                className="text-hanaPurple drop-shadow-lg"
                              />
                            </label>
                          ) : (
                            <TbCheckbox
                              size={30}
                              className="bg-blend-lighten text-hanaPurple drop-shadow-lg"
                              onClick={() => clickHandler()}
                            />
                          )}
                          <input
                            id="bannerImg"
                            type="file"
                            className="hidden"
                            onChange={handleImg}
                          />
                        </div>
                      )}
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
                    {plans?.data?.map((item) => (
                      <PlanItem
                        key={item.planId}
                        title={item.planName}
                        date={item.planDate.toString()}
                        place={item.place}
                        cost={item.cost}
                        image={item.planImg}
                      />
                    ))}
                    {/* 일정 추가 버튼 */}
                    {role === "CHAIR" && (
                      <div
                        className="w-full flex justify-center p-12 bg-white rounded-3xl drop-shadow-lg cursor-pointer"
                        onClick={() => {
                          navigate("/create-plan", {
                            state: {
                              teamId: locationState.teamId,
                              from: locationState.from,
                            },
                          });
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
            {!(role === "CHAIR" || role === "REGULAR") && (
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
