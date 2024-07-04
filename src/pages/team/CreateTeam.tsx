import { useEffect, useRef, useState } from "react";
import {
  AccountItem,
  Button,
  CategoryCard,
  ConfirmCard,
  SelectAccount,
  SelectModal,
  Topbar,
} from "../../components";
import { useNavigate } from "react-router-dom";
import { GoPerson, GoPlus } from "react-icons/go";
import { SlPicture } from "react-icons/sl";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import categories from "../../utils/categories";
import { useMutation, useQuery } from "@tanstack/react-query";
import { teamApi } from "../../apis/domains/teamApi";
import { accountApi } from "../../apis/domains/accountApi";

const CreateTeam = () => {
  const navigate = useNavigate();

  const { mutate: createTeam } = useMutation({
    mutationFn: (team: FormData) => {
      const response = teamApi.getInstance().postCreateTeam(team);
      return response;
    },
    onSuccess: () => {
      navigate("/home");
    },
    onError: (err) => {
      console.log(err.message);
      alert("모임 생성에 실패했습니다.");
    },
  });

  const { data: accountInfo } = useQuery({
    queryKey: ["accountInfo"],
    queryFn: () => {
      const response = accountApi.getInstance().getAccount();
      return response;
    },
  });

  const [step, setStep] = useState<number>(1);
  const [category, setCategory] = useState<CategoryType>({
    name: "운동/스포츠",
    image: "sports",
  });
  const [content, setContent] = useState({
    teamName: "",
    teamDesc: "",
    capacity: 0,
    thumbNail: new File([], ""),
  });
  const [memberText, setMemberText] = useState<string>("");
  const [account, setAccount] = useState({
    accountId: 0,
    accountNumber: "",
  });
  const [isActive, setIsActive] = useState<boolean>(false);
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  const [accountModal, setAccountModal] = useState<boolean>(false);
  const [attachment, setAttachment] = useState<string>("");

  const nameRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLTextAreaElement | null>(null);
  const memberRef = useRef<HTMLInputElement | null>(null);

  const stepHandler = () => {
    const formData = new FormData();
    if (step === 1) {
      console.log(
        nameRef.current!.value,
        descRef.current!.value,
        category.name,
        Number(memberRef.current!.value)
      );
      setContent({
        ...content,
        teamName: nameRef.current!.value,
        teamDesc: descRef.current!.value,
        capacity: Number(memberRef.current!.value),
      });
      setIsActive(false);
      setStep(2);
    } else if (step === 2) {
      formData.append(
        "createTeam",
        new Blob(
          [
            JSON.stringify({
              teamName: content.teamName,
              teamDesc: content.teamDesc,
              capacity: content.capacity,
              category: category.name,
            }),
          ],
          { type: "application/json" }
        )
      );
      formData.append("thumbNail", content.thumbNail);
      createTeam(formData);
      setStep(3);
    } else if (step === 3) {
      navigate("/home");
    }
  };

  const onClickBack = () => {
    if (step === 1) {
      navigate(-1);
      setIsActive(true);
    } else {
      setStep(step - 1);
    }
  };

  const onClickCategory = (index: number) => {
    setCategory(categories[index]);
    setCategoryModal(false);
  };

  const onClickAccount = (accountId: number, accountNumber: string) => {
    setAccount({
      accountId: accountId,
      accountNumber: accountNumber,
    });
    setAccountModal(false);
    setIsActive(true);
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
      memberRef.current!.value.length === 0 ||
      attachment === ""
    ) {
      setIsActive(false);
      return;
    }

    setIsActive(true);
  };

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    if (files.length > 0) {
      const file = files[0];
      setContent({ ...content, thumbNail: file });

      const url = URL.createObjectURL(file);
      setAttachment(url);
    }
  };

  useEffect(() => {
    attachment !== "" && checkStep1Value();
  }, [attachment]);

  return (
    <section>
      {categoryModal && (
        <SelectModal
          title="카테고리 선택"
          onClose={() => setCategoryModal(false)}
        >
          <div className="w-full h-72 rounded-3xl bg-white grid grid-cols-4 gap-2 p-7">
            <CategoryCard onClick={onClickCategory} />
          </div>
        </SelectModal>
      )}
      {accountModal && (
        <SelectModal title="계좌 선택" onClose={() => setAccountModal(false)}>
          <AccountItem
            accountId={accountInfo?.data?.accountId!}
            title={accountInfo?.data?.accountName!}
            accountNumber={accountInfo?.data?.accountNumber!}
            balance={accountInfo?.data?.balance!}
            onClick={onClickAccount}
          />
        </SelectModal>
      )}
      <Topbar title="모임 개설" onClick={onClickBack} />
      <div className="flex flex-col min-h-real-screen2 justify-between">
        {/* 1페이지 */}
        {step === 1 && (
          <div className="flex flex-col py-7 px-10 gap-10">
            {/* 모임 이름 */}
            <div className="flex flex-row w-full justify-between items-center gap-4">
              <div
                className="flex justify-center items-center w-[4.5rem] h-[4.5rem] bg-[#EBEBEB] rounded-full cursor-pointer"
                onClick={() => setCategoryModal(true)}
              >
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
                  <label
                    htmlFor="imgInput"
                    className={`flex w-36 h-36 justify-center items-center ${
                      !attachment && "border-dashed border-[3px] border-white"
                    }  my-2 rounded-3xl`}
                  >
                    {attachment ? (
                      <div
                        className="flex w-36 h-36 justify-center items-center rounded-3xl bg-cover bg-center"
                        style={{ backgroundImage: `url(${attachment})` }}
                      ></div>
                    ) : (
                      <GoPlus color="ffffff" size={64} />
                    )}
                    <input
                      id="imgInput"
                      type="file"
                      className="hidden"
                      onChange={handleImg}
                    />
                  </label>
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
                setAccountModal(true);
              }}
              account={account.accountNumber}
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
        {step === 3 && <ConfirmCard text="모임 등록 완료!" />}
        <div className="flex flex-row justify-center mb-7">
          <Button
            text={step <= 2 ? "다음" : "완료"}
            onClick={() => stepHandler()}
            isActive={isActive}
          />
        </div>
      </div>
    </section>
  );
};

export default CreateTeam;
