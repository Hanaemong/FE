import { useEffect, useState } from "react";
import { Button, DueHistoryItem, Topbar } from "../../components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { dateMonth, dateYear } from "../../utils/getDate";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { transactionApi } from "../../apis/domains/transactionApi";

const Dues = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const locationState = location.state as {
    teamId: number;
    teamName: string;
    nickname: string;
    memberCnt: number;
  };

  const [isDeposit, setIsDeposit] = useState<boolean>(true);
  const [year, setYear] = useState<number>(dateYear);
  const [month, setMonth] = useState<number>(dateMonth);

  const { data: transactions } = useQuery({
    queryKey: ["teamTransaction"],
    queryFn: () => {
      const res = transactionApi
        .getInstance()
        .getTeamTransaction(
          locationState.teamId,
          `${year}-${month.toString().padStart(2, "0")}`
        );
      return res;
    },
  });

  const onClickArrow = (value: number) => {
    if (year === dateYear && month === dateMonth && value === 1) return;
    if (year === 2000 && month === 1 && value === -1) return;

    if (month + value == 0) {
      setMonth(12);
      setYear(year - 1);
    } else if (month + value == 13) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + value);
    }
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["teamTransaction"] });
  }, [month, year]);

  return (
    <section>
      <Topbar title="회비 내역" />
      <div className="flex flex-col min-h-real-screen2 justify-between">
        <div className="flex flex-col">
          {/* 모임 정보 카드 */}
          <div className="flex flex-col w-full h-64 py-24 bg-custom-light-gradient gap-10 justify-center items-center">
            <p className="font-hanaRegular text-2xl">
              모임 계좌번호 {transactions?.data?.accountNumber}
            </p>
            <p className="font-hanaBold text-5xl">
              {transactions?.data?.balance.toLocaleString()} 원
            </p>
          </div>
          {/* 입금 출금 버튼 영역 */}
          <div className="flex w-full h-[4.5rem] flex-row justify-around items-center px-7">
            <div
              className={`flex justify-center items-end w-36 h-[99%] text-2xl font-hanaRegular pb-2 cursor-pointer border-b-[3px] ${
                isDeposit ? "border-hanaPurple" : "border-white"
              }`}
              onClick={() => !isDeposit && setIsDeposit(true)}
            >
              입금
            </div>
            <div
              className={`flex justify-center items-end w-36 h-[99%] text-2xl font-hanaRegular pb-2 cursor-pointer border-b-[3px] ${
                !isDeposit ? "border-hanaPurple" : "border-white"
              }`}
              onClick={() => isDeposit && setIsDeposit(false)}
            >
              출금
            </div>
          </div>
          <div className="w-full h-[0.1rem] bg-black" />
          <div className="flex flex-col pb-4">
            <div className="flex flex-row w-full pt-10 justify-center">
              <IoIosArrowBack
                size={20}
                className={`my-auto ${
                  year === 2000 && month === 1 && "text-gray-400"
                }`}
                onClick={() => onClickArrow(-1)}
              />
              <p className="font-hanaCM text-3xl leading-9 mx-5">
                {year}년 {String(month).padStart(2, "0")}월
              </p>
              <IoIosArrowForward
                size={20}
                className={`my-auto ${
                  year === dateYear && month === dateMonth && "text-gray-400"
                }`}
                onClick={() => onClickArrow(1)}
              />
            </div>
            {isDeposit
              ? transactions?.data?.transactionResList
                  .filter((item) => item.type === "TRANSFER")
                  .map((item, index) => (
                    <DueHistoryItem
                      key={index}
                      name={item.memberName}
                      nickname={item.memberNickname}
                      gender={item.memberGender}
                      balance={item.amount}
                      date={new Date(item.paidDate)}
                      isDeposit
                    />
                  ))
              : transactions?.data?.transactionResList
                  .filter((item) => item.type === "PAYMENT")
                  .map((item, index) => (
                    <DueHistoryItem
                      key={index}
                      name={item.memberName}
                      nickname={item.memberNickname}
                      gender={item.memberGender}
                      balance={item.amount}
                      date={new Date(item.paidDate)}
                      isDeposit={false}
                    />
                  ))}
          </div>
        </div>
        <div className="flex flex-row justify-center pb-10">
          <Button
            text="회비 납부하기"
            onClick={() =>
              navigate("/sending", {
                state: {
                  receiveName: locationState.teamName,
                  receiveAccount: transactions?.data?.accountNumber,
                  teamId: locationState.teamId,
                  nickname: locationState.nickname,
                  memberCnt: locationState.memberCnt,
                },
              })
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Dues;
