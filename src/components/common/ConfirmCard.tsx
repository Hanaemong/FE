import { FC } from "react";
import { FaCheck } from "react-icons/fa6";

interface IProps {
  text: string;
}

const ConfirmCard: FC<IProps> = ({ text }) => {
  return (
    <>
      <div className="flex flex-col mt-96 items-center">
        <div className="size-36 rounded-full bg-custom-gradient flex flex-col items-center justify-center">
          <FaCheck size={48} className="text-white" />
        </div>
        <p className="mt-10 font-hanaRegular text-3xl whitespace-pre">{text}</p>
      </div>
    </>
  );
};

export default ConfirmCard;
