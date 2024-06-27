import { useState } from "react";
import { Button, ConfirmCard, SurveyCard, Topbar } from "../../components";
import { useNavigate } from "react-router-dom";

const Survey = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);
  const [scoreArr, setScoreArr] = useState<number[]>([1, 1, 1, 1]);

  const stepHandler = () => {
    if (step <= 2) {
      setStep(step + 1);
    } else if (step === 3) {
      // 설문조사 완료 api 전송
      navigate(-1);
    }
  };

  const onClickItem = (index: number, value: number) => {
    const newScoreArr = scoreArr.map((item, idx) => {
      if (index === idx) return value;
      else return item;
    });
    setScoreArr(newScoreArr);
  };

  return (
    <section>
      <Topbar title="설문조사" />
      <div className="w-full bg-custom-light-gradient h-[0.15rem]"></div>
      <div className="flex flex-col min-h-real-screen2 justify-between px-10 py-12">
        {/* 참여 확인 */}
        {step === 1 && (
          <p className="font-hanaRegular text-3xl">
            Q. 이번 모임 활동에 참여하셨습니까?
          </p>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-24">
            <SurveyCard
              index={0}
              score={scoreArr[0]}
              title="Q1. 모임 활동에 얼마나 만족하셨습니까?"
              onClick={onClickItem}
            />
            <SurveyCard
              index={1}
              score={scoreArr[1]}
              title="Q2. 모임 활동이 기대에 부합했습니까?"
              onClick={onClickItem}
            />
            <SurveyCard
              index={2}
              score={scoreArr[2]}
              title="Q3. 모임의 운영과 관리는 어땠습니까?"
              onClick={onClickItem}
            />
            <SurveyCard
              index={3}
              score={scoreArr[3]}
              title="Q4. 모임에 다시 참여할 의향이 있습니까?"
              onClick={onClickItem}
            />
          </div>
        )}
        {step === 3 && (
          <div>
            <ConfirmCard
              text="설문조사가 완료되었습니다.
            감사합니다 :)"
            />
          </div>
        )}
        {/* 버튼 영역 */}
        {step === 1 && (
          <div className="flex flex-row justify-between gap-7">
            <Button text="아니오" onClick={() => navigate(-1)} />
            <Button text="예" onClick={() => stepHandler()} />
          </div>
        )}
        {step >= 2 && (
          <div className="flex justify-center">
            <Button
              text={step === 2 ? "제출" : "확인"}
              onClick={() => stepHandler()}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Survey;
