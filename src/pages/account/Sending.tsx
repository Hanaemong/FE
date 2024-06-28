import { useState } from "react";
import {
  AccountItem,
  Button,
  ConfirmCard,
  Password,
  SelectAccount,
  SelectModal,
  SendingModal,
  Topbar,
} from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

const Sending = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as {
    receiveName: string;
    receiveAccount: string;
  };

  const [step, setStep] = useState<number>(1);
  const [price, setPrice] = useState<number>();
  const [moneyCap, setMoneyCap] = useState<boolean>(true);
  const [account, setAccount] = useState({
    accountId: 0,
    accountNumber: "",
    accountBalance: 0,
  });
  const [accountModal, setAccountModal] = useState<boolean>(false);
  const [sendModal, setSendModal] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  const onClickBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setIsActive(true);
      if (step === 4) {
        setSendModal(true);
      }
    } else {
      navigate(-1);
    }
  };

  const onCloseSendModal = () => {
    setSendModal(false);
    onClickBack();
  };

  const priceChangeHandler = (e: any) => {
    let inputPrice = e.target.value;

    inputPrice = Number(inputPrice.replace(/[^0-9]/g, ""));

    setPrice(inputPrice.toLocaleString());
  };

  const blurInput = () => {
    if (!price) return;

    const content = document.getElementById("warning1");

    if (price == 0) {
      setIsActive(false);
      setMoneyCap(false);
      content!.innerText = "0원은 송금할 수 없습니다.";
      return;
    }

    let realPrice = Number(String(price).replaceAll(",", ""));

    if (realPrice > account.accountBalance) {
      setIsActive(false);
      setMoneyCap(false);
      content!.innerText = "현재 잔액보다 큰 금액은 송금할 수 없습니다.";
      return;
    }

    if (!price || price != 0) {
      setIsActive(true);
      setMoneyCap(true);
    }
  };

  const onClickAccount = (
    accountId: number,
    accountNumber: string,
    accountBalance: number
  ) => {
    setAccount({
      accountId: accountId,
      accountNumber: accountNumber,
      accountBalance: accountBalance,
    });
    setAccountModal(false);
    setIsActive(true);
  };

  const stepHandler = () => {
    if (step === 1) {
      setIsActive(false);
    } else if (step === 2) {
      setIsActive(false);
      setSendModal(true);
    } else if (step === 3) {
      setSendModal(false);
    } else if (step === 4) {
      setIsActive(true);
    } else if (step === 5) {
      // api 전송하고 모임상세 페이지로 되돌아가기
      navigate("/home");
    }
    setStep(step + 1);
  };

  return (
    <section>
      {accountModal && (
        <SelectModal title="계좌 선택" onClose={() => setAccountModal(false)}>
          <AccountItem
            accountId={1}
            title="영하나 플러스"
            accountNumber="123-543-6323451"
            balance={200000}
            onClick={onClickAccount}
          />
        </SelectModal>
      )}
      {sendModal && (
        <SendingModal
          balance={price!}
          sendName={getCookie("name")}
          receiveName={locationState.receiveName}
          sendAccount={account.accountNumber}
          receiveAccount={locationState.receiveAccount}
          onClose={() => onCloseSendModal()}
          onClick={() => stepHandler()}
        />
      )}
      <Topbar title="회비 납부" onClick={() => onClickBack()} />
      <div className="flex flex-col min-h-real-screen2 justify-between px-10 py-12">
        {/* 참여 확인 */}
        {step === 1 && (
          <div className="flex flex-col gap-7">
            <p className="py-7 font-hanaMedium text-[2.25rem]">
              출금 계좌 선택
            </p>
            <SelectAccount
              account={account.accountNumber}
              onClick={() => setAccountModal(true)}
            />
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col items-center">
            <p className="font-hanaMedium text-[2.25rem] py-10">송금할 금액</p>
            <div className="flex flex-row justify-center items-center text-3xl font-hanaLight">
              <input
                type="text"
                className="border-b-2 h-28 w-3/5 text-[3rem] text-center font-hanaRegular"
                placeholder="보낼 금액"
                value={price}
                onChange={(e) => priceChangeHandler(e)}
                onBlur={() => blurInput()}
                maxLength={13}
              />
              {price && "원"}
            </div>
            <p
              id="warning1"
              className={`${
                moneyCap ? "hidden" : "visible"
              } text-red-500 text-xl font-hanaRegular mt-4`}
            ></p>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col items-center">
            <p className="font-hanaMedium text-[2.25rem] mt-10 mb-5">
              송금할 금액
            </p>
            <p className="flex flex-row justify-center items-center text-[3rem] font-hanaLight">
              {price}원
            </p>
          </div>
        )}
        {step === 4 && <Password onPasswordComplete={() => stepHandler()} />}
        {step === 5 && <ConfirmCard text="회비 납부 완료!" />}
        {/* 버튼 영역 */}
        {step != 4 && (
          <div className="flex justify-center">
            <Button
              text={step <= 2 ? "다음" : "확인"}
              onClick={() => stepHandler()}
              isActive={isActive}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Sending;
