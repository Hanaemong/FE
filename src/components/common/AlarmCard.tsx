import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  title: string;
  body: string;
  teamId: number;
  toggleShowAlarm: (toggle: boolean) => void;
}

const AlarmCard: FC<IProps> = ({ title, body, teamId, toggleShowAlarm }) => {
  const navigate = useNavigate();

  const onClickAlarm = () => {
    if (teamId === -1) {
      return;
    }

    navigate("/survey", {
      state: {
        teamId: teamId,
      },
    });
    toggleShowAlarm(false);
  };

  const [activeAnimation, setActiveAnimation] = useState<boolean>(true);
  useEffect(() => {
    const animate = setTimeout(() => {
      setActiveAnimation(false);
    }, 4000);
    const timeout = setTimeout(() => {
      toggleShowAlarm(false);
    }, 5200);
    return () => {
      clearTimeout(animate);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      className={`fixed max-w-[500px] w-full z-[70] pt-3 px-3 ${
        activeAnimation ? "animate-slideindown" : "animate-slideoutup"
      }`}
    >
      <div
        className={`w-full h-36 flex flex-row items-center gap-7 px-7 py-3 bg-white rounded-3xl drop-shadow-2xl ${
          teamId != -1 && "cursor-pointer"
        } `}
        onClick={() => onClickAlarm()}
      >
        <img src="/img/vip.png" alt="image" className="size-20" />
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-hanaBold">{title}</p>
          <p className="text-2xl font-hanaRegular w-11/12 line-clamp-2">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlarmCard;
