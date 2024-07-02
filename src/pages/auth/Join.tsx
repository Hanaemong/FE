import React, { useRef, useState } from "react";
import {
  Button,
  ConfirmCard,
  Password,
  RegionItem,
  RegionModal,
  SelectModal,
  Topbar,
} from "../../components";
import { useNavigate } from "react-router-dom";
import { PiCaretDown } from "react-icons/pi";
import { phoneNumAutoHyphen } from "../../utils/phonNumAutoHyphen";

const Join = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const phoneNumRef = useRef<HTMLInputElement | null>(null);
  const codeRef = useRef<HTMLInputElement | null>(null);
  const [modal, openModal] = useState<boolean>(false);
  const [telecom, setTelecom] = useState<string>("");
  const [phoneNum, setPhoneNum] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [sigun, setSigun] = useState<string>("");
  const [sigungu, setSigungu] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [confirmPwd, setConfirmPwd] = useState<string>("");
  const [confirm, checkConfirm] = useState<boolean>(false);

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const onPasswordComplete = (password: string) => {
    if (step === 6) {
      setPwd(password);
      nextStep();
    } else if (step === 7) {
      setConfirmPwd(password);
      console.log(confirmPwd);
      if (password === pwd) {
        nextStep();
      } else {
        checkConfirm(true);
      }
    }
  };

  const onClickTelecom = (item: string) => {
    setTelecom(item);
    openModal((prev) => !prev);
  };

  const handlePhoneNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNum = phoneNumAutoHyphen(e.target.value);
    setPhoneNum(formattedPhoneNum);
  };

  const selectGender = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const selectSigun = (selectedSigun: string) => {
    setSigun(selectedSigun);
  };

  const selectSigungu = (selectedSigungu: string) => {
    setSigungu(selectedSigungu);
  };

  const regionHandler = () => {
    if (sigun && sigungu) {
      setRegion(`${sigun} ${sigungu}`);
    }
    openModal((prev) => !prev);
  };

  return (
    <>
      {
        // 통신사 선택 모달
        modal && type === "telecom" ? (
          <SelectModal
            title="통신사"
            onClose={() => openModal((prev) => !prev)}
          >
            <div className="flex flex-col gap-5">
              <div
                className="font-hanaRegular text-xl border-hanaGray border-b-2 pb-3"
                onClick={() => onClickTelecom("SKT")}
              >
                SKT
              </div>
              <div
                className="font-hanaRegular text-xl border-hanaGray border-b-2 pb-3"
                onClick={() => onClickTelecom("KT")}
              >
                KT
              </div>
              <div
                className="font-hanaRegular text-xl border-hanaGray border-b-2 pb-3"
                onClick={() => onClickTelecom("LG U+")}
              >
                LG U+
              </div>
            </div>
          </SelectModal>
        ) : // 시군, 시군구 선택 모달
        modal && type === "location" ? (
          <RegionModal sigun="시군" sigungu="시군구" onClose={regionHandler}>
            <div className="w-full flex justify-between">
              <div className="w-1/2 border-r-2 ">
                <RegionItem
                  title="서울"
                  onClick={() => selectSigun("서울")}
                  region={sigun}
                />
                <RegionItem
                  title="경기"
                  onClick={() => selectSigun("경기")}
                  region={sigun}
                />
                <RegionItem
                  title="인천"
                  onClick={() => selectSigun("인천")}
                  region={sigun}
                />
              </div>
              <div className="w-1/2">
                <RegionItem
                  title="고양시 일산서구"
                  onClick={() => selectSigungu("고양시 일산서구")}
                  region={sigungu}
                />
                <RegionItem
                  title="창원시 마산 합포구"
                  onClick={() => selectSigungu("창원시 마산 합포구")}
                  region={sigungu}
                />
              </div>
            </div>
          </RegionModal>
        ) : (
          <></>
        )
      }
      <section className="min-h-real-screen2 h-screen flex flex-col items-center relative z-10">
        {step !== 1 && step !== 8 && (
          <Topbar title="회원가입" onClick={() => prevStep()} />
        )}
        <div className="h-full w-full flex flex-col items-center justify-between py-8 pb-16">
          {step === 1 ? (
            // 이름 입력
            <div className="w-5/6 mt-20 px-6 flex flex-col items-center gap-6">
              <span className="w-full text-3xl font-hanaMedium text-left">
                이름을 입력해주세요
              </span>
              <input
                className="w-full h-[4rem] rounded-2xl border border-spacing-1 text-2xl font-hanaMedium px-4 placeholder-[#979797]"
                placeholder="이름"
                ref={nameRef}
              />
              <div className="flex gap-1">
                <div className="text-lg font-hanaCM text-[#757575]">
                  이미 계정이 있으신가요?
                </div>
                <div
                  className="text-lg font-hanaCM text-hanaPurple underline"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  로그인
                </div>
              </div>
            </div>
          ) : step === 2 ? (
            // 전화번호 입력
            <div className="w-5/6 flex flex-col items-center gap-6">
              <span className="w-full text-3xl font-hanaMedium text-left">
                전화번호를 입력해주세요
              </span>
              <div
                className="w-full flex relative"
                onClick={() => {
                  openModal((prev) => !prev);
                  setType("telecom");
                }}
              >
                <div
                  id="telecom"
                  className={`w-full h-[4rem] rounded-2xl border border-spacing-1 flex items-center text-2xl text-left px-4 font-hanaMedium ${
                    !telecom && "text-[#979797]"
                  }`}
                >
                  {telecom === "" ? "통신사 선택" : telecom}
                  <PiCaretDown
                    size={20}
                    className="text-[#979797] absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                  />
                </div>
              </div>
              <input
                className="w-full h-[4rem] rounded-2xl border border-spacing-1 text-2xl font-hanaMedium px-4 placeholder-[#979797]"
                type="tel"
                maxLength={13}
                placeholder="전화 번호"
                ref={phoneNumRef}
                value={phoneNum}
                onChange={(e) => handlePhoneNum(e)}
              />
            </div>
          ) : step === 3 ? (
            // 전화번호 인증
            <div className="w-5/6 flex flex-col items-center gap-6">
              <span className="w-full text-3xl font-hanaMedium text-left">
                휴대전화로 인증코드를 보내드렸어요
              </span>
              <div className="w-full flex justify-between gap-1">
                <input
                  type="number"
                  className="w-5/6 h-[4rem] rounded-2xl border border-spacing-1 text-2xl font-hanaMedium px-4 placeholder-[#979797]"
                  placeholder="인증코드"
                  ref={codeRef}
                />
                <button className="px-5 py-3 bg-hanaPurple rounded-2xl text-white font-hanaRegular text-xl">
                  확인
                </button>
              </div>
              <div className="w-full text-lg text-left font-hanaRegular text-[#979797]">
                {phoneNum}로 보낸 인증코드를 입력해주세요
              </div>
            </div>
          ) : step === 4 ? (
            // 성별 입력
            <div className="w-5/6 flex flex-col items-center gap-6">
              <span className="w-full text-3xl font-hanaMedium text-left">
                성별을 선택해주세요
              </span>
              <div className="w-full flex justify-between">
                <div
                  className={`border border-[#D6D6D6] text-3xl font-hanaRegular rounded-2xl px-24 py-10 ${
                    gender === "male"
                      ? "text-hanaPurple border-hanaPurple"
                      : "text-[#979797]"
                  }`}
                  onClick={() => selectGender("male")}
                >
                  남성
                </div>
                <div
                  className={`border border-[#D6D6D6] text-[#979797] text-3xl font-hanaRegular rounded-2xl px-24 py-10 ${
                    gender === "female"
                      ? "text-hanaPurple border-hanaPurple"
                      : "text-[#979797]"
                  }`}
                  onClick={() => selectGender("female")}
                >
                  여성
                </div>
              </div>
            </div>
          ) : step === 5 ? (
            // 지역 입력, 인증
            <div className="w-5/6 flex flex-col items-center gap-6">
              <span className="w-full text-3xl font-hanaMedium text-left">
                지역을 선택해주세요
              </span>
              <div className="w-full flex justify-between gap-1">
                <input
                  className="w-3/4 h-[4rem] rounded-2xl border border-spacing-1 text-left text-2xl font-hanaMedium px-4 text-[#979797]"
                  type="button"
                  value={region || "지역 선택"}
                  onClick={() => {
                    openModal((prev) => !prev);
                    setType("location");
                  }}
                />
                <button className="px-3 py-2 bg-hanaPurple rounded-2xl text-white font-hanaRegular text-xl">
                  위치 확인
                </button>
              </div>
              <div className="w-full text-lg text-left font-hanaRegular text-[#979797]">
                선택 위치를 GPS로 인증을 받아와요
              </div>
            </div>
          ) : step === 6 ? (
            // 간편 비밀번호 입력
            <div className="w-5/6 flex flex-col items-center gap-6">
              <span className="w-full text-3xl font-hanaMedium text-left">
                비밀번호를 설정해주세요
              </span>
              <Password onPasswordComplete={onPasswordComplete} />
            </div>
          ) : step === 7 ? (
            // 간편 비밀번호 재입력
            <div className="w-5/6 flex flex-col items-center gap-6">
              <span className="w-full text-3xl font-hanaMedium text-left">
                비밀번호를 한 번 더 입력해주세요
              </span>
              <Password
                onPasswordComplete={onPasswordComplete}
                confirm={confirm}
              />
            </div>
          ) : (
            <div className="w-5/6 flex flex-col items-center gap-6">
              <ConfirmCard text="회원 가입 완료!" />
            </div>
          )}

          {step === 8 ? (
            <Button
              text="완료"
              onClick={() => {
                navigate("/login");
              }}
            />
          ) : step === 6 ? (
            <></>
          ) : step === 7 ? (
            <></>
          ) : (
            <Button text="다음" onClick={() => nextStep()} />
          )}
        </div>
      </section>
    </>
  );
};

export default Join;
