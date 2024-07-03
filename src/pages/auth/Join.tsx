import React, { useEffect, useRef, useState } from "react";
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
import { useGeolocation } from "../../hooks/useGeolocation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { regionApi } from "../../apis/domains/regionApi";
import { memberApi } from "../../apis/domains/memberApi";
import { setCookie } from "../../utils/cookie";

const geolocationOptions = {
  enableHighAccuracy: false,
  timeout: 0,
};

const Join = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { location } = useGeolocation(geolocationOptions);

  const [step, setStep] = useState<number>(1);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const phoneNumRef = useRef<HTMLInputElement | null>(null);
  const codeRef = useRef<HTMLInputElement | null>(null);
  const [modal, openModal] = useState<boolean>(false);
  const [telecom, setTelecom] = useState<string>("");
  const [phoneNum, setPhoneNum] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [sigun, setSigun] = useState<{ id: number; name: string }>({
    id: 1,
    name: "",
  });
  const [sigungu, setSigungu] = useState<{ id: number; name: string }>();
  const [region, setRegion] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [confirm, checkConfirm] = useState<boolean>(true);
  const [regionCheckResult, setRegionCheckResult] = useState<string>("");

  const { mutate: checkPhone, data: result } = useMutation({
    mutationFn: (phone: string) => {
      return memberApi.getInstance().postPhoneCheck(phone);
    },
    onSuccess: (response) => {
      console.log(response);
      if (response.data) {
        setIsActive(false);
      } else if (!response.data) {
        setIsActive(true);
      }
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const { mutate: postMsg } = useMutation({
    mutationFn: (phone: string) => {
      return memberApi.getInstance().postPhoneMsg(phone);
    },
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const { mutate: checkMsg, data: msgResult } = useMutation({
    mutationFn: (checkReq: CheckMsgReqType) => {
      return memberApi.getInstance().postCheckMsg(checkReq);
    },
    onSuccess: (response) => {
      if (response.data?.check === "인증번호 일치") {
        setIsActive(true);
      } else if (response.data?.check === "인증번호 불일치") {
        setIsActive(false);
      }
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const { data: siguns } = useQuery({
    queryKey: ["sigun"],
    queryFn: () => {
      const res = regionApi.getInstance().getSigun();
      return res;
    },
  });

  const { data: sigungus } = useQuery({
    queryKey: ["sigungu"],
    queryFn: () => {
      const res = regionApi.getInstance().getSigungu(sigun?.id!);
      return res;
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["sigungu"] });
  }, [sigun]);

  const { mutate: checkRegion, data } = useMutation({
    mutationFn: (region: CheckRegionType) => {
      return regionApi.getInstance().postRegionCheck(region);
    },
    onSuccess: (response) => {
      console.log(response);
      if (response.data?.match) {
        setRegionCheckResult("위치가 인증되었습니다");
      } else {
        setRegionCheckResult("선택한 지역과 일치하지 않습니다");
      }
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const { mutate: join } = useMutation({
    mutationFn: (user: JoinType) => {
      return memberApi.getInstance().postJoin(user);
    },
    onSuccess: (response) => {
      console.log(response);
      setCookie("name", inputs.name);
      setCookie("phone", inputs.phone);
      setStep((prev) => prev + 1);
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const [inputs, setInputs] = useState<JoinType>({
    name: "",
    phone: "",
    gender: "",
    password: "",
    siGunId: 0,
    siGunGuId: 0,
    fcmToken: "",
    profile: "",
  });

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isName, setIsName] = useState<boolean>(true);
  const [isPhone, setIsPhone] = useState<boolean>(true);

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const nextStep = () => {
    if (step === 1 && isName) {
      setInputs({ ...inputs, name: nameRef.current!.value });
      setStep((prev) => prev + 1);
      setIsActive(false);
    }
    if (step === 2 && isPhone) {
      setInputs({ ...inputs, phone: phoneNumRef.current!.value });
      setStep((prev) => prev + 1);
      postMsg(phoneNumRef.current!.value);
      setIsActive(false);
    }
    if (step === 3) {
      setStep((prev) => prev + 1);
      setIsActive(false);
    }

    if (step === 4 && gender !== "") {
      setInputs({ ...inputs, gender: gender });
      if (gender === "m") {
        setInputs({
          ...inputs,
          profile:
            "https://hanalinkbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A7%E1%86%AF%E1%84%83%E1%85%A9%E1%86%AF%E1%84%8B%E1%85%B5.svg",
        });
      } else {
        setInputs({
          ...inputs,
          profile:
            "https://hanalinkbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A7%E1%86%AF%E1%84%89%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B5.svg",
        });
      }
      setStep((prev) => prev + 1);
      setIsActive(false);
    }

    if (step === 5 && region !== "") {
      setInputs({ ...inputs, siGunId: sigun?.id!, siGunGuId: sigungu?.id! });
      setStep((prev) => prev + 1);
      setIsActive(false);
    }

    if (step === 7) {
      console.log(pwd);
      setInputs((prevInputs) => {
        const updatedInputs = { ...prevInputs, password: pwd };
        join(updatedInputs);
        return updatedInputs;
      });
    }

    // setStep((prev) => prev + 1);
  };

  const checkCondition = (title: string) => {
    if (title === "name") {
      if (!!nameRef.current?.value.length) {
        setIsName(true);
        setIsActive(true);
      } else {
        setIsName(false);
        setIsActive(false);
      }
    }
    if (title === "phone") {
      if (!!phoneNumRef.current?.value.length) {
        setIsPhone(true);
      } else {
        setIsPhone(false);
      }
      setIsActive(false);
    }
  };

  const checkCode = () => {
    if (!!codeRef.current?.value.length) {
      checkMsg({
        phone: inputs.phone,
        code: codeRef.current?.value,
      });
    } else {
      setIsActive(false);
    }
  };

  const onPasswordComplete = (password: string) => {
    setPwd(password);
    setStep((prev) => prev + 1);
  };

  const onRePasswordComplete = (password: string) => {
    if (password === pwd) {
      nextStep();
      checkConfirm(true);
    } else {
      checkConfirm(false);
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

  const selectSigun = (id: number, name: string) => {
    setSigun({ id, name });
  };

  const selectSigungu = (id: number, name: string) => {
    setSigungu({ id, name });
  };

  const regionHandler = () => {
    if (sigun && sigungu) {
      setRegion(`${sigun.name} ${sigungu.name}`);
      setIsActive(true);
    }
    openModal((prev) => !prev);
  };

  const getCurrentRegion = () => {
    const latitude = location?.latitude!;
    const longitude = location?.longitude!;
    console.log(latitude);
    console.log(longitude);

    setRegionCheckResult("");
    setIsActive(false);

    checkRegion({
      latitude,
      longitude,
      siGunId: sigun.id,
      siGunGuId: sigungu?.id!,
    });
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
                {siguns?.map((item, index) => (
                  <RegionItem
                    key={index}
                    title={item.siGun}
                    onClick={() => selectSigun(item.siGunId, item.siGun)}
                    region={sigun?.name!}
                  />
                ))}
              </div>
              <div className="w-1/2">
                {sigungus?.map((item, index) => (
                  <RegionItem
                    key={index}
                    title={item.siGunGu}
                    onClick={() => selectSigungu(item.siGunGuId, item.siGunGu)}
                    region={sigungu?.name!}
                  />
                ))}
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
            <div
              className={`w-5/6 mt-20 px-6 flex flex-col items-center gap-6`}
            >
              <span className="w-full text-3xl font-hanaMedium text-left">
                이름을 입력해주세요
              </span>
              <input
                className={`w-full h-[4rem] rounded-2xl border ${
                  isName
                    ? "border-spacing-1 placeholder-[#979797]"
                    : "border-red-500"
                } text-2xl font-hanaMedium px-4 `}
                placeholder="이름"
                ref={nameRef}
                onBlur={() => checkCondition("name")}
              />
              {isName ? (
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
              ) : (
                <div className="self-start text-xl font-hanaMedium text-red-500 text-left">
                  이름을 입력해주세요
                </div>
              )}
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
              <div className="w-full flex justify-between gap-1">
                <input
                  className="w-3/4 h-[4rem] rounded-2xl border border-spacing-1 text-2xl font-hanaMedium px-4 placeholder-[#979797]"
                  type="tel"
                  maxLength={13}
                  placeholder="전화 번호"
                  ref={phoneNumRef}
                  value={phoneNum}
                  onChange={(e) => handlePhoneNum(e)}
                  onBlur={() => checkCondition("phone")}
                />
                <button
                  className="px-5 py-3 bg-hanaPurple rounded-2xl text-white font-hanaRegular text-xl"
                  onClick={() => checkPhone(phoneNumRef.current!.value)}
                >
                  중복확인
                </button>
              </div>
              {!isPhone && (
                <div className="self-start text-xl font-hanaMedium text-red-500 text-left">
                  전화번호를 입력해주세요
                </div>
              )}
              {isPhone && result?.success && result.data && (
                <div className="self-start text-xl font-hanaMedium text-red-500 text-left">
                  이미 가입된 전화번호입니다
                </div>
              )}
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
                  className={`w-5/6 h-[4rem] rounded-2xl border  ${
                    msgResult?.success &&
                    msgResult?.data?.check === "인증번호 일치" &&
                    "border-blue-500"
                  }  ${
                    msgResult?.success &&
                    msgResult?.data?.check === "인증번호 불일치" &&
                    "border-red-500"
                  } border-spacing-1 text-2xl font-hanaMedium px-4 placeholder-[#979797]`}
                  placeholder="인증코드"
                  ref={codeRef}
                />
                <button
                  className="px-5 py-3 bg-hanaPurple rounded-2xl text-white font-hanaRegular text-xl"
                  onClick={() => checkCode()}
                >
                  확인
                </button>
              </div>
              {msgResult?.success || (
                <div className="w-full text-lg text-left font-hanaRegular text-[#979797]">
                  {phoneNum}로 보낸 인증코드를 입력해주세요
                </div>
              )}
              {msgResult?.success &&
                msgResult?.data?.check === "인증번호 일치" && (
                  <div className="w-full text-lg text-left font-hanaRegular text-blue-500">
                    인증되었습니다.
                  </div>
                )}
              {msgResult?.success &&
                msgResult?.data?.check === "인증번호 불일치" && (
                  <div className="w-full text-lg text-left font-hanaRegular text-red-500">
                    인증코드가 틀렸습니다.
                  </div>
                )}
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
                    gender === "m"
                      ? "text-hanaPurple border-hanaPurple"
                      : "text-[#979797]"
                  }`}
                  onClick={() => selectGender("m")}
                >
                  남성
                </div>
                <div
                  className={`border border-[#D6D6D6] text-[#979797] text-3xl font-hanaRegular rounded-2xl px-24 py-10 ${
                    gender === "f"
                      ? "text-hanaPurple border-hanaPurple"
                      : "text-[#979797]"
                  }`}
                  onClick={() => selectGender("f")}
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
                  className={`w-3/4 h-[4rem] rounded-2xl border ${
                    data?.success && data.data?.match && "border-blue-500"
                  } ${
                    data?.success && !data.data?.match && "border-red-500"
                  } border-spacing-1 text-left text-2xl font-hanaMedium px-4 text-[#979797]`}
                  type="button"
                  value={region || "지역 선택"}
                  onClick={() => {
                    openModal((prev) => !prev);
                    setType("location");
                  }}
                />
                <button
                  className="px-3 py-2 bg-hanaPurple rounded-2xl text-white font-hanaRegular text-xl"
                  onClick={getCurrentRegion}
                >
                  위치 확인
                </button>
              </div>
              {regionCheckResult === "" ? (
                <div className="w-full text-lg text-left font-hanaRegular text-[#979797]">
                  선택 위치를 GPS로 인증을 받아와요
                </div>
              ) : (
                <div
                  className={`w-full text-lg text-left font-hanaRegular ${
                    data?.data?.match === true
                      ? "text-blue-500"
                      : "text-red-500"
                  } `}
                >
                  {regionCheckResult}
                </div>
              )}
            </div>
          ) : step === 6 ? (
            // 간편 비밀번호 입력
            <div className="w-5/6 flex flex-col items-center gap-6">
              <span className="w-full text-3xl font-hanaMedium text-left">
                비밀번호를 설정해주세요
              </span>
              <Password
                onPasswordComplete={onPasswordComplete}
                confirm={true}
              />
            </div>
          ) : step === 7 ? (
            // 간편 비밀번호 재입력
            <div className="w-5/6 flex flex-col items-center gap-6">
              <span className="w-full text-3xl font-hanaMedium text-left">
                비밀번호를 한 번 더 입력해주세요
              </span>
              <Password
                onPasswordComplete={onRePasswordComplete}
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
          ) : step === 4 ? (
            <Button
              text="다음"
              onClick={() => nextStep()}
              isActive={gender === "" ? false : true}
            />
          ) : step === 6 ? (
            <></>
          ) : step === 7 ? (
            <></>
          ) : (
            <Button
              text="다음"
              onClick={() => nextStep()}
              isActive={isActive}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Join;
