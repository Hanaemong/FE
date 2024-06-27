import { FC } from "react";
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

interface IProps {
  title: string;
  onClick?: () => void;
  prohibit?: boolean;
}

const Topbar: FC<IProps> = ({ title, onClick, prohibit }) => {
  const navigate = useNavigate();

  return (
    <div
      className="sticky top-0 left-0 w-full flex justify-center items-center bg-white
      } pt-7 pb-4 z-20"
    >
      {!prohibit && (
        <div
          className="absolute left-2 cursor-pointer"
          onClick={() => {
            if (onClick) {
              onClick();
            } else {
              navigate(-1);
            }
          }}
        >
          <GoChevronLeft size={25} />
        </div>
      )}
      <div className="justify-center text-3xl font-hanaBold">{title}</div>
    </div>
  );
};

export default Topbar;
