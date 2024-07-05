import { FC } from "react";

interface Iprops {
  text: string;
  onClick: () => void;
  isActive?: boolean;
}

const Button: FC<Iprops> = ({ text, onClick, isActive }) => {
  const clickHandler = () => {
    if (isActive == null || isActive) {
      onClick();
    }
  };

  return (
    <div
      className={`flex bg-custom-gradient justify-center h-[4.5rem] w-5/6 rounded-full text-white font-hanaBold text-3xl ${
        isActive == null || isActive ? "cursor-pointer" : "opacity-35"
      }`}
      onClick={() => {
        clickHandler();
      }}
    >
      <div className="my-auto">{text}</div>
    </div>
  );
};

export default Button;
