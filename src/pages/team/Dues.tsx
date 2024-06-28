import { useState } from "react";
import { Button, DueHistoryItem, Topbar } from "../../components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Dues = () => {
  const [isDeposit, setIsDeposit] = useState<boolean>(true);
  const [year, setYear] = useState<number>(2024);
  const [month, setMonth] = useState<number>(6);

  return (
    <section>
      <Topbar title="회비 내역" />
      <div className="flex flex-col min-h-real-screen2 justify-between">
        <div className="flex flex-col">
          {/* 모임 정보 카드 */}
          <div className="flex flex-col w-full h-64 py-24 bg-custom-light-gradient gap-10 justify-center items-center">
            <p className="font-hanaRegular text-2xl">
              모임 계좌번호 111-222222-33333
            </p>
            <p className="font-hanaBold text-5xl">150,000 원</p>
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
                // onClick={() => onClickArrow(-1)}
              />
              <p className="font-hanaCM text-3xl leading-9 mx-5">
                {year}년 {String(month).padStart(2, "0")}월
              </p>
              <IoIosArrowForward
                size={20}
                className={`my-auto ${
                  year === 2024 && month === 6 && "text-gray-400"
                }`}
                // onClick={() => onClickArrow(1)}
              />
            </div>
            <DueHistoryItem
              name="김현우"
              gender="M"
              balance={50000}
              isDeposit
              date={new Date()}
            />
            <DueHistoryItem
              name="김지윤"
              gender="W"
              balance={50000}
              isDeposit
              date={new Date()}
            />
            <DueHistoryItem
              name="안나영"
              gender="W"
              balance={50000}
              isDeposit
              date={new Date()}
            />
            <DueHistoryItem
              name="신명지"
              gender="W"
              balance={50000}
              isDeposit
              date={new Date()}
            />
            <DueHistoryItem
              name="김현우"
              gender="M"
              balance={50000}
              isDeposit
              date={new Date()}
            />
            <DueHistoryItem
              name="김지윤"
              gender="W"
              balance={50000}
              isDeposit
              date={new Date()}
            />
            <DueHistoryItem
              name="안나영"
              gender="W"
              balance={50000}
              isDeposit
              date={new Date()}
            />
            <DueHistoryItem
              name="신명지"
              gender="W"
              balance={50000}
              isDeposit
              date={new Date()}
            />
            <DueHistoryItem
              name="김현우"
              gender="M"
              balance={50000}
              isDeposit
              date={new Date()}
            />
            <DueHistoryItem
              name="김지윤"
              gender="W"
              balance={50000}
              isDeposit
              date={new Date()}
            />
            <DueHistoryItem
              name="안나영"
              gender="W"
              balance={50000}
              isDeposit
              date={new Date()}
            />
            <DueHistoryItem
              name="신명지"
              gender="W"
              balance={50000}
              isDeposit
              date={new Date()}
            />
            <DueHistoryItem
              name="김현우"
              gender="M"
              balance={50000}
              isDeposit
              date={new Date()}
            />
            <DueHistoryItem
              name="김지윤"
              gender="W"
              balance={50000}
              isDeposit
              date={new Date()}
            />
            <DueHistoryItem
              name="안나영"
              gender="W"
              balance={50000}
              isDeposit
              date={new Date()}
            />
            <DueHistoryItem
              name="신명지"
              gender="W"
              balance={50000}
              isDeposit
              date={new Date()}
            />
            <DueHistoryItem
              name="김현우"
              gender="M"
              balance={50000}
              isDeposit
              date={new Date()}
            />
            <DueHistoryItem
              name="김지윤"
              gender="W"
              balance={50000}
              isDeposit
              date={new Date()}
            />
            <DueHistoryItem
              name="안나영"
              gender="W"
              balance={50000}
              isDeposit
              date={new Date()}
            />
            <DueHistoryItem
              name="신명지"
              gender="W"
              balance={50000}
              isDeposit
              date={new Date()}
            />
          </div>
        </div>
        <div className="flex flex-row justify-center pb-10">
          <Button text="회비 납부하기" onClick={() => console.log("ㅎㅇ")} />
        </div>
      </div>
    </section>
  );
};

export default Dues;
