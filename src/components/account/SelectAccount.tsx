import { FC } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface Iprops {
  onClick: () => void;
  account?: string;
}

const SelectAccount: FC<Iprops> = ({ onClick, account }) => {
  return (
    <div
      className="flex flex-col w-full cursor-pointer"
      onClick={() => onClick()}
    >
      <div className="flex m-full justify-between flex-row">
        <div className="flex flex-row gap-4">
          <img src="img/hanaLogo.png" alt="logo" className="w-9 h-9" />
          <p
            className={`flex my-auto font-hanaLight text-xl pt-2 ${
              account == null ? "text-gray-400" : ""
            }`}
          >
            {account == "" ? "계좌를 선택해주세요." : `하나 ${account}`}
          </p>
        </div>
        <div className="flex justify-center items-center pt-2">
          <IoIosArrowDown color="545454" size={15} />
        </div>
      </div>
      <div className="bg-gray-300 h-[0.15rem] mt-1"></div>
    </div>
  );
};

export default SelectAccount;
