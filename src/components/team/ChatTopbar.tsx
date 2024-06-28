import { FC } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

interface IProps {
  title: string;
  member: number;
  teamId: number;
}

const ChatTopbar: FC<IProps> = ({ title, member, teamId }) => {
  const navigate = useNavigate();

  const onClickTeam = () => {
    // navigate("/team", {
    //   state: {
    //     teamId: teamId,
    //   },
    // });
    navigate("/sending", {
      state: {
        receiveName: "배드민턴 동호회",
        receiveAccount: "123-123456-12345",
      },
    });
  };

  return (
    <div className="sticky top-0 left-0 w-full flex flex-row bg-white px-2 py-7 gap-4 z-10 items-center">
      <div
        className="cursor-pointer"
        onClick={() => {
          navigate(-1);
        }}
      >
        <GoChevronLeft size={30} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-3xl font-hanaBold">{title}</p>
        <div className="flex flex-row gap-2 font-hanaRegular text-hanaPurple text-2xl">
          <p>{member}명 참여중</p>
          <p>|</p>
          <div
            className="flex flex-row cursor-pointer"
            onClick={() => onClickTeam()}
          >
            <p>모임 바로가기</p>
            <GoChevronRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTopbar;
