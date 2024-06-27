import { FC } from "react";
import { FaCheck } from "react-icons/fa6";

interface IProps {
  text: string;
}

const ConfirmCard: FC<IProps> = ({ text }) => {
  return (
    <>
      <div className="flex flex-col mt-96">
        <div className="size-36 rounded-full bg-custom-gradient flex flex-col items-center justify-center">
          <FaCheck size={64} className="text-white" />
        </div>
      </div>
      <p className="mt-3 font-hanaMedium text-2xl">{text}</p>
    </>
  );
};

export default ConfirmCard;
