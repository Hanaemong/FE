import { GoChevronRight } from "react-icons/go";
import { TeamItem } from "../../components";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { memberApi } from "../../apis/domains/memberApi";
import { accountApi } from "../../apis/domains/accountApi";
import { teamApi } from "../../apis/domains/teamApi";
import { useEffect } from "react";

const My = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: memberInfo } = useQuery({
    queryKey: ["memberInfo"],
    queryFn: () => {
      const response = memberApi.getInstance().getMemberInfo();
      return response;
    },
  });

  const { data: accountInfo } = useQuery({
    queryKey: ["accountInfo"],
    queryFn: () => {
      const response = accountApi.getInstance().getAccount();
      return response;
    },
  });

  const {
    data: list,
    error,
    isError,
  } = useQuery({
    queryKey: ["list"],
    queryFn: () => {
      const res = teamApi.getInstance().getMyTeam();
      return res;
    },
  });

  useEffect(() => {
    if (isError) {
      console.log(error.message);
      alert("내 모임을 불러오는 데 실패했습니다.");
    }
  }, [isError]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["list"] });
    queryClient.invalidateQueries({ queryKey: ["accountInfo"] });
  }, []);

  return (
    <section className="min-h-real-screen bg-hanaGray">
      <div className="flex flex-col p-7 gap-4 bg-custom-light-gradient h-88">
        <div
          className="flex items-center font-hanaBold text-3xl py-3"
          onClick={() => navigate("/certificate-region")}
        >
          {getCookie("siGunGu")}
          <GoChevronRight size={25} />
        </div>
        {/* 사용자 정보 */}
        <div className="w-full flex bg-white rounded-2xl p-5">
          <div className="w-1/3 flex flex-col gap-2 items-center justify-center">
            <img src={memberInfo?.data?.profile} className="size-24" />
            <p className="font-hanaMedium text-2xl">{memberInfo?.data?.name}</p>
          </div>
          <div className="w-2/3 flex flex-col gap-2 rounded-2xl border font-hanaRegular p-5 text-xl">
            <div className="flex">
              <img src="/img/hanaLogo.png" className="size-6 mr-1" />
              <p>{accountInfo?.data?.accountName}</p>
            </div>
            <div>{accountInfo?.data?.accountNumber}</div>
            <p className="h-full flex justify-end items-end font-hanaMedium text-xl">
              {accountInfo?.data?.balance.toLocaleString()} 원
            </p>
          </div>
        </div>
      </div>
      {/* 내 모임 */}
      <div className="px-7 pt-7 pb-3 font-hanaMedium text-2xl">내 모임</div>
      <div className="w-full px-7 flex flex-col ">
        <div className="w-full flex flex-col px-9 py-7 gap-4 bg-white rounded-2xl">
          <div className="flex flex-col gap-10">
            {list?.data?.map((item, index) => (
              <TeamItem
                key={index}
                teamId={item.teamId}
                name={item.teamName}
                image={item.thumbNail}
                category={item.category}
                member={item.memberCnt}
                rating={item.score}
                from="my"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default My;
