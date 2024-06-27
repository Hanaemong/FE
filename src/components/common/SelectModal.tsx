import { FC, ReactNode } from "react";
import { IoClose } from "react-icons/io5";

interface IProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const SelectModal: FC<IProps> = ({ title, children, onClose }) => {
  return (
    <>
      <div
        className="absolute flex flex-col items-center justify-center bg-black bg-opacity-40 w-full h-full top-0 left-0 z-50"
        onClick={onClose}
      ></div>
      <div className="absolute z-50 bottom-0 left-0 w-full h-auto bg-white rounded-t-[3rem] pt-3 pb-10">
        <div className="flex h-20 items-center px-7">
          <IoClose size={28} className="cursor-pointer" onClick={onClose} />
          <div className="font-hanaRegular text-2xl w-full text-center mr-10">
            {title}
          </div>
        </div>
        <hr className="mt-0.5 divide-hanaGray" />
        <div className="max-h-[30rem] overflow-y-auto px-7 mt-5">
          {children}
        </div>
      </div>
    </>
  );
};

export default SelectModal;
