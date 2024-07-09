import { FC, ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

interface Iprops {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const AlertModal: FC<Iprops> = ({ title, children, onClose }) => {
  return (
    <>
      <div
        className="absolute flex flex-col left-0 top-0 justify-center items-center w-full h-full bg-black bg-opacity-50 z-50"
        onClick={() => onClose()}
      ></div>
      <div className="absolute left-1/2 -translate-x-1/2 translate-y-96 flex flex-col justify-center rounded-2xl gap-4 bg-white z-[60] min-w-[80%] border-4 border-hanaPurple">
        <div className="w-full flex flex-row justify-center px-4 pt-6">
          <p className="font-hanaRegular text-3xl pr-4">{title}</p>
          <div className="absolute right-5">
            <IoMdClose
              size={20}
              className="cursor-pointer"
              onClick={() => onClose()}
            />
          </div>
        </div>
        <div className="px-7 pt-7 pb-10 max-h-[40rem] overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default AlertModal;
