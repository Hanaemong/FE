import { useRef, useState } from "react";
import { Button, ConfirmCard, Topbar } from "../../components";
import {
  PiCalendarDots,
  PiCurrencyKrw,
  PiImage,
  PiMapPinLight,
} from "react-icons/pi";
import { GoClock } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { planApi } from "../../apis/domains/planApi";

const Plan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [complete, setComlpete] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [attachment, setAttachment] = useState<string>("");
  const nameRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const timeRef = useRef<HTMLInputElement | null>(null);
  const placeRef = useRef<HTMLInputElement | null>(null);
  const costRef = useRef<HTMLInputElement | null>(null);

  const [plan, setPlan] = useState<PlanType>({
    planName: "",
    planDate: "",
    planPlace: "",
    planCost: 0,
    planImg: new File([], ""),
  });

  const locationState = location.state as {
    teamId: number;
  };

  const { mutate: postPlan } = useMutation({
    mutationFn: (req: { teamId: number; plan: FormData }) => {
      return planApi.getInstance().postPlan(req);
    },
    onSuccess: (response) => {
      console.log(response);
      setComlpete(true);
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const checkCondition = () => {
    if (!!nameRef.current?.value.length) {
      setPlan({ ...plan, planName: nameRef.current.value });
    }
    if (!!dateRef.current?.value.length && !!timeRef.current?.value.length) {
      const date = dateRef.current.value;
      const time = timeRef.current.value;
      setPlan({ ...plan, planDate: `${date}T${time}:00` });
    }
    if (!!placeRef.current?.value.length) {
      setPlan({ ...plan, planPlace: placeRef.current.value });
    }
    if (!!costRef.current?.value.length) {
      setPlan({ ...plan, planCost: Number(costRef.current.value) });
    }
    if (
      nameRef.current?.value.length &&
      dateRef.current?.value.length &&
      timeRef.current?.value.length &&
      placeRef.current?.value.length &&
      costRef.current?.value.length
    ) {
      setIsActive(true);
    }
  };

  const clickHandler = () => {
    if (!complete) {
      setComlpete(true);
      const formData = new FormData();
      formData.append(
        "planPost",
        new Blob(
          [
            JSON.stringify({
              planName: plan.planName,
              planDate: plan.planDate,
              planPlace: plan.planPlace,
              planCost: plan.planCost,
            }),
          ],
          { type: "application/json" }
        )
      );
      formData.append("planImg", plan.planImg);
      postPlan({ teamId: locationState.teamId, plan: formData });
    }

    if (complete) navigate("/team");
  };

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    if (files.length > 0) {
      const file = files[0];
      setPlan({ ...plan, planImg: file });

      const url = URL.createObjectURL(file);
      setAttachment(url);
    }
  };

  // useEffect(() => {}, []);

  return (
    <section>
      <Topbar title="일정 개설" />
      <div className="min-h-real-screen2 flex flex-col pb-12 justify-between items-center">
        {!complete && (
          <div className="w-full flex flex-col p-7 gap-7">
            <input
              placeholder="일정 이름"
              className="w-full rounded-2xl p-5 bg-hanaGray font-hanaRegular placeholder:text-hanaSilver2 placeholder:text-3xl text-3xl"
              ref={nameRef}
              onBlur={() => checkCondition()}
            />
            <div className="flex items-center gap-10">
              <PiCalendarDots size={32} />
              <input
                type="date"
                placeholder="2024-01-01"
                required
                className="w-full rounded-2xl p-5 bg-hanaGray font-hanaRegular placeholder:text-3xl text-3xl"
                ref={dateRef}
                onBlur={() => checkCondition()}
              />
            </div>
            <div className="flex items-center gap-10">
              <GoClock size={32} />
              <input
                type="time"
                placeholder="오전 00:00"
                required
                className="w-full rounded-2xl p-5 bg-hanaGray font-hanaRegular placeholder:text-3xl text-3xl"
                ref={timeRef}
                onBlur={() => checkCondition()}
              />
            </div>
            <div className="flex items-center gap-10">
              <PiMapPinLight size={32} />
              <input
                placeholder="장소"
                maxLength={15}
                className="w-full rounded-2xl p-5 bg-hanaGray font-hanaRegular placeholder:text-hanaSilver2 placeholder:text-3xl text-3xl"
                ref={placeRef}
                onBlur={() => checkCondition()}
              />
            </div>
            <div className="flex items-center gap-10">
              <PiCurrencyKrw size={32} />
              <input
                placeholder="비용"
                type="number"
                className="w-full rounded-2xl p-5 bg-hanaGray font-hanaRegular placeholder:text-hanaSilver2 placeholder:text-3xl text-3xl"
                ref={costRef}
                onBlur={() => checkCondition()}
              />
            </div>
            <div className="flex items-center gap-10">
              <PiImage size={32} />
              <label
                htmlFor="imgInput"
                className="w-full h-[100px] flex flex-col items-center justify-center rounded-2xl bg-hanaGray p-5"
              >
                {attachment && (
                  <div
                    className="w-40 h-24 rounded-2xl bg-cover bg-center"
                    style={{ backgroundImage: `url(${attachment})` }}
                  ></div>
                )}
              </label>
              <input
                id="imgInput"
                type="file"
                className="hidden"
                onChange={handleImg}
              />
            </div>
          </div>
        )}
        {complete && <ConfirmCard text="일정 등록 완료!" />}
        <Button
          text={complete ? "완료" : " 일정 개설하기"}
          onClick={() => clickHandler()}
          isActive={isActive}
        />
      </div>
    </section>
  );
};

export default Plan;
