import { useRef, useState } from "react";
import { Button, SelectAccount, Topbar } from "../../components";
import { useNavigate } from "react-router-dom";
import { GoPerson, GoPlus } from "react-icons/go";
import { SlPicture } from "react-icons/sl";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

const CreateTeam = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);
  const [category, setCategory] = useState<CategoryType>({
    name: "운동/스포츠",
    image: "sports",
  });
  const [memberText, setMemberText] = useState<string>("");
  const [account, setAccount] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLTextAreaElement | null>(null);
  const memberRef = useRef<HTMLInputElement | null>(null);

  const stepHandler = () => {
    if (step === 1 || step === 2) {
      setIsActive(false);
      setStep(step + 1);
    } else if (step === 3) {
      // 모임 개설 api request
      navigate("/home");
    }
  };

  const onClickBack = () => {
    if (step === 1) {
      navigate(-1);
    } else {
      setStep(step - 1);
    }
  };

  const onBlurMember = () => {
    if (typeof Number(memberRef.current!.value) != "number") {
      setMemberText("올바른 숫자를 입력해주세요.");
      setIsActive(false);
    } else if (
      Number(memberRef.current!.value) > 100 ||
      Number(memberRef.current!.value) < 2
    ) {
      setMemberText("정원은 2명 이상 100명 이하로 설정해주세요.");
      setIsActive(false);
    } else {
      setMemberText("");
      checkStep1Value();
    }
  };

  const checkStep1Value = () => {
    if (
      nameRef.current!.value.length === 0 ||
      descRef.current!.value.length === 0 ||
      memberRef.current!.value.length === 0
    ) {
      setIsActive(false);
      return;
    }

    setIsActive(true);
  };

  return (
    <section>
      <Topbar title="모임 개설" onClick={onClickBack} />
      <div className="flex flex-col min-h-real-screen2 justify-between">
        {/* 1페이지 */}
        {step === 1 && (
          <div className="flex flex-col py-7 px-10 gap-10">
            {/* 모임 이름 */}
            <div className="flex flex-row w-full justify-between items-center gap-4">
              <div className="flex justify-center items-center w-[4.5rem] h-[4.5rem] bg-[#EBEBEB] rounded-full cursor-pointer">
                <img
                  src={`/img/${category.image}.png`}
                  alt="image"
                  className="w-10 h-10"
                />
              </div>
              <input
                type="text"
                className="w-5/6 h-[4.5rem] focus:border-2 focus:border-hanaSilver text-[#A0A0A0] bg-[#EBEBEB] p-4 text-3xl font-hanaRegular rounded-2xl"
                placeholder="모임 이름"
                maxLength={20}
                onBlur={() => checkStep1Value()}
                ref={nameRef}
              />
            </div>
            {/* 모임 내용 */}
            <textarea
              className="w-full h-96 focus:outline-hanaSilver text-[#A0A0A0] bg-[#EBEBEB] p-7 text-3xl font-hanaRegular rounded-2xl"
              placeholder="모임 내용을 설명해주세요"
              maxLength={500}
              onBlur={() => checkStep1Value()}
              ref={descRef}
            />
            {/* 정원 */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center gap-3">
                  <GoPerson size={30} />
                  <p className="text-3xl font-hanaRegular">정원</p>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <input
                    type="text"
                    pattern="\d*"
                    className="w-24 h-16 focus:border-2 focus:border-hanaSilver text-[#A0A0A0] bg-[#EBEBEB] p-4 text-3xl font-hanaRegular rounded-2xl text-end"
                    maxLength={3}
                    onBlur={() => onBlurMember()}
                    ref={memberRef}
                  />
                  <p className="text-3xl font-hanaMedium"> / 최대 100명</p>
                </div>
              </div>
              <p className="w-full h-7 text-right font-hanaBold text-2xl text-red-500">
                {memberText}
              </p>
            </div>
            {/* 이미지 영역 */}
            <div className="flex flex-col gap-7">
              <div className="flex flex-row gap-3 items-center">
                <SlPicture size={30} />
                <div className="flex flex-col"></div>
                <p className="text-3xl font-hanaRegular">대표 사진</p>
              </div>
              <div className="flex flex-row justify-center">
                <div className="flex w-full h-48 bg-[#EBEBEB] rounded-2xl justify-center items-center">
                  <div
                    className="flex w-36 h-36 justify-center items-center border-dashed border-[3px] border-white my-2 rounded-3xl"
                    onClick={() => console.log("이미지 추가")}
                  >
                    <GoPlus color="ffffff" size={64} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* 2 페이지 */}
        {step === 2 && (
          <div className="flex flex-col px-10">
            <p className="font-hanaRegular text-3xl my-14">
              어떤 계좌로 시작할까요?
            </p>
            <SelectAccount
              onClick={() => {
                alert("모달이 뜰거예요");
                setIsActive(true);
              }}
              account={account}
            />
            <div className="mt-4 flex flex-row gap-3 items-center">
              <HiOutlineExclamationCircle size={20} color="#FF0000" />
              <p className="font-hanaRegular text-xl">
                한 모임당 하나의 계좌만 등록할 수 있어요.
              </p>
            </div>
          </div>
        )}
        {/* 3 페이지 */}
        {step === 3 && (
          // confirm component 사용
          <div>
            <div></div>
          </div>
        )}
        <div className="flex flex-row justify-center mb-7">
          <Button
            text="다음"
            onClick={() => stepHandler()}
            isActive={isActive}
          />
        </div>
      </div>
    </section>
  );
};

export default CreateTeam;
