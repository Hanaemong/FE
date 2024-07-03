import { useEffect, useState } from "react";
import { Button, MemberItem, Topbar } from "../../components";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { surveyApi } from "../../apis/domains/surveyApi";
import { teamMemberApi } from "../../apis/domains/teamMemberApi";

const Members = () => {
  const location = useLocation();
  const queryClient = useQueryClient();

  const locationState = location.state as {
    role: string;
    teamId: number;
  };

  const [changeBtn, setChangeBtn] = useState<boolean>(false);

  const memberQuery = useQuery({
    queryKey: ["memberList"],
    queryFn: () => {
      const res = teamMemberApi
        .getInstance()
        .getTeamMember(locationState.teamId);
      return res;
    },
  });

  const { mutate: requestSurvey } = useMutation({
    mutationFn: (teamId: number) => {
      const response = surveyApi.getInstance().postRequestSurvey(teamId);
      return response;
    },
    onSuccess: (response) => {
      alert("모임원에게 설문조사를 요청했습니다.");
      console.log(response.data);
    },
    onError: (err) => {
      alert("설문조사 요청에 실패했습니다.");
      console.log(err.message);
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
      alert("모임원을 내보냈습니다.");
      queryClient.invalidateQueries({ queryKey: ["memberList"] });
    },
    onError: (err) => {
      alert("모임원 내보내기에 실패했습니다.");
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
      alert("가입을 승낙했습니다.");
      queryClient.invalidateQueries({ queryKey: ["memberList"] });
    },
    onError: (err) => {
      alert("멤버 가입에 실패했습니다.");
      console.log(err.message);
    },
  });

  const onDeny = (teamMemberId: number) => {
    deleteMember({ teamMemberId: teamMemberId, type: "REJECT" });
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
            {memberQuery.data?.data?.length}명 참여중
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
                  name={item.name}
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
                      name={item.name}
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
                    name={item.name}
                    gender={item.gender}
                    role="모임원"
                    changeBtn={changeBtn}
                    isChair={locationState.role === "CHAIR"}
                  />
                ))}
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
            <Button
              text="설문조사 보내기"
              onClick={() => {
                requestSurvey(locationState.teamId);
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Members;
