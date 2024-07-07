import { useEffect, useState } from "react";
import { Button, MemberItem, Topbar } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { surveyApi } from "../../apis/domains/surveyApi";
import { teamMemberApi } from "../../apis/domains/teamMemberApi";

const Members = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const locationState = location.state as {
    role: string;
    teamId: number;
    from: string;
  };

  const [changeBtn, setChangeBtn] = useState<boolean>(false);
  const [type, setType] = useState<string>("");

  const memberQuery = useQuery({
    queryKey: ["memberList"],
    queryFn: () => {
      const res = teamMemberApi
        .getInstance()
        .getTeamMember(locationState.teamId);
      return res;
    },
  });

  const { mutate: deleteMember } = useMutation({
    mutationFn: (param: { teamMemberId: number; type: string }) => {
      const response = teamMemberApi
        .getInstance()
        .deleteTeamMember(param.teamMemberId, param.type);
      return response;
    },
    onSuccess: () => {
      alert(
        `${
          type === "DENY"
            ? "가입 신청을 거절했습니다."
            : type === "REJECT"
            ? "모임원을 내보냈습니다."
            : "모임에서 탈퇴했습니다"
        }`
      );
      type === "LEAVE"
        ? navigate("/home")
        : queryClient.invalidateQueries({ queryKey: ["memberList"] });
    },
    onError: (err) => {
      alert("모임원 내보내기에 실패했습니다.");
      console.log(err.message);
    },
  });

  const { mutate: changeChair } = useMutation({
    mutationFn: (teamMemberId: number) => {
      const response = teamMemberApi
        .getInstance()
        .postChangeChair(locationState.teamId, teamMemberId);
      return response;
    },
    onSuccess: () => {
      alert("총무를 변경했습니다.");
      navigate("/team", {
        state: {
          teamId: locationState.teamId,
          from: locationState.from,
        },
      });
    },
    onError: (err) => {
      if (err.message == "Access Denied") {
        alert("해당 모임원은 총무로 임명할 수 없습니다.");
      } else {
        alert("총무 변경에 실패했습니다.");
      }
      console.log(err.message);
    },
  });

  const { mutate: acceptMember } = useMutation({
    mutationFn: (teamMemberId: number) => {
      const response = teamMemberApi
        .getInstance()
        .updateTeamMember(teamMemberId);
      return response;
    },
    onSuccess: () => {
      alert("가입 신청을 수락했습니다.");
      queryClient.invalidateQueries({ queryKey: ["memberList"] });
    },
    onError: (err) => {
      alert("멤버 가입에 실패했습니다.");
      console.log(err.message);
    },
  });

  // 거절
  const onDeny = (teamMemberId: number) => {
    setType("DENY");
    deleteMember({ teamMemberId: teamMemberId, type: "DENY" });
  };

  // 내보내기
  const onReject = (teamMemberId: number) => {
    setType("REJECT");
    deleteMember({ teamMemberId: teamMemberId, type: "REJECT" });
  };

  // 탈퇴하기
  const onLeave = (teamMemberId: number) => {
    setType("LEAVE");
    deleteMember({ teamMemberId: teamMemberId, type: "LEAVE" });
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["memberList"] });
  }, []);

  return (
    <section>
      <Topbar title="모임원" />
      <div className="min-h-real-screen2 flex flex-col justify-between">
        <div className="flex flex-col p-7 gap-10">
          {/* 모임 멤버수 */}
          <div className="font-hanaBold text-2xl pb-2 border-b-2 border-hanaGray">
            {
              memberQuery.data?.data?.filter((item) => item.role !== "PENDING")
                .length
            }
            명 참여중
          </div>
          {/* 모임 총무 */}
          <div className="flex flex-col">
            <div className="font-hanaBold text-2xl">총무</div>
            {memberQuery.data?.data
              ?.filter((item) => item.role === "CHAIR")
              .map((item, index) => (
                <MemberItem
                  key={index}
                  teamMemberId={item.teamMemberId}
                  nickname={item.nickName}
                  gender={item.gender}
                  role="총무"
                  changeBtn={changeBtn}
                  setChangeBtn={setChangeBtn}
                  isChair={locationState.role === "CHAIR"}
                />
              ))}
          </div>
          {/* 모임 가입 요청 */}
          {locationState.role === "CHAIR" && (
            <div className="flex flex-col mb-7">
              <div className="font-hanaBold text-2xl">대기중</div>
              <div className="flex flex-col gap-3">
                {memberQuery.data?.data
                  ?.filter((item) => item.role === "PENDING")
                  .map((item, index) => (
                    <MemberItem
                      key={index}
                      teamMemberId={item.teamMemberId}
                      nickname={item.nickName}
                      gender={item.gender}
                      role="가입요청"
                      onDeny={onDeny}
                      onAccept={acceptMember}
                    />
                  ))}
              </div>
            </div>
          )}
          {/* 모임원 목록 */}
          <div className="flex flex-col">
            <div className="font-hanaBold text-2xl">모임원</div>
            <div className="flex flex-col gap-3">
              {memberQuery.data?.data
                ?.filter((item) => item.role === "REGULAR")
                .map((item, index) => (
                  <MemberItem
                    key={index}
                    teamMemberId={item.teamMemberId}
                    nickname={item.nickName}
                    gender={item.gender}
                    role="모임원"
                    changeBtn={changeBtn}
                    changeChair={changeChair}
                    onReject={onReject}
                    isChair={locationState.role === "CHAIR"}
                  />
                ))}
              {locationState.role !== "CHAIR" && (
                <p
                  className="w-full text-end text-xl font-hanaMedium underline underline-offset-2 text-hanaSilver2 mt-7 pr-3 cursor-pointer"
                  onClick={() => onLeave(locationState.teamId)}
                >
                  탈퇴하기
                </p>
              )}
            </div>
          </div>
        </div>
        {/* {locationState.role === "CHAIR" && (
          <div className="flex flex-row justify-center mb-7">
            <Button
              text="설문조사 보내기"
              onClick={() => {
                requestSurvey(locationState.teamId);
              }}
            />
          </div>
        )} */}
      </div>
    </section>
  );
};

export default Members;
