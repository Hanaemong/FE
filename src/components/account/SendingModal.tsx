import { FC } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Button from "../common/Button";

interface IProps {
  balance: number;
  sendName: string;
  receiveName: string;
  sendAccount: string;
  receiveAccount: string;
  onClose: () => void;
  onClick: () => void;
}

const SendingModal: FC<IProps> = ({
  balance,
  sendName,
  receiveName,
  sendAccount,
  receiveAccount,
  onClose,
  onClick,
}) => {
  return (
    <>
      <div
        className="fixed flex flex-col items-center justify-center bg-black bg-opacity-50 w-[500px] h-full z-[60]"
        onClick={onClose}
      ></div>
      <div className="absolute z-[70] bottom-0 bg-white w-full h-auto pb-10 rounded-t-[3rem]">
        <div className="flex flex-row w-full h-20 justify-end items-end px-7">
          <IoCloseOutline
            size={28}
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="flex flex-col px-10 mt-2 h-full justify-between">
          <div className="flex flex-col justify-center items-center">
            <p className="font-hanaMedium text-center text-4xl leading-[2.75rem] mb-10">
              모임통장으로 <br />
              {balance.toLocaleString()}원을 보냅니다.
            </p>
            <div className="flex flex-row justify-between w-full mb-2 px-3 text-2xl font-hanaRegular text-hanaSilver2">
              <p>받는분</p>
              <p className="flex flex-row">하나 {receiveAccount}</p>
            </div>
            <div className="flex flex-row justify-between w-full mb-4 px-3 text-2xl font-hanaRegular text-hanaSilver2">
              <p>보내는분</p>
              <p className="flex flex-row">하나 {sendAccount}</p>
            </div>
            <div className="w-full bg-hanaSilver h-[0.05rem] mb-4" />
            <div className="flex flex-row justify-between w-full mb-2 px-3 text-2xl font-hanaRegular text-hanaSilver2">
              <p>받는 분에게 표시</p>
              <p className="flex flex-row">{sendName}</p>
            </div>
            <div className="flex flex-row justify-between w-full mb-10 px-3 text-2xl font-hanaRegular text-hanaSilver2 truncate">
              <p>나에게 표시</p>
              <p className="w-80 truncate text-right">{receiveName}</p>
            </div>
            <div className="w-full flex justify-center mb-2">
              <Button text="완료" onClick={() => onClick()} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendingModal;
