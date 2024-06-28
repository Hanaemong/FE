import { FC } from "react";

interface Iprops {
  accountId: number;
  title: string;
  accountNumber: string;
  balance: number;
  onClick: (
    clickedAccountId: number,
    clickedAccountNumber: string,
    clickedBalance: number
  ) => void;
}

const AccountItem: FC<Iprops> = ({
  accountId,
  title,
  accountNumber,
  balance,
  onClick,
}) => {
  return (
    <div
      className="flex flex-col px-5 cursor-pointer"
      onClick={() => {
        onClick(accountId, accountNumber, balance);
      }}
    >
      <div className="flex flex-row h-28 justify-between">
        <div className="flex flex-row justify-center items-center">
          <img src="/img/hanaLogo.png" alt="logo" className="w-10 h-10 mr-4" />
          <div className="flex flex-col font-hanaLight text-2xl">
            <p>{title}</p>
            <p className="text-hanaSilver2 tracking-tight">{accountNumber}</p>
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <p className="font-hanaMedium text-2xl">
            {balance.toLocaleString()}원
          </p>
        </div>
      </div>
      <div className="bg-gray-200 h-[0.1rem] mt-2"></div>
    </div>
  );
};

export default AccountItem;
