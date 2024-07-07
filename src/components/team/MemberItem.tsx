import { FC } from "react";
import { MdFemale, MdMale } from "react-icons/md";

interface IProps {
  teamMemberId: number;
  gender: string;
  role: string;
  nickname: string;
  changeBtn?: boolean;
  isChair?: boolean;
  setChangeBtn?: (value: boolean) => void;
  changeChair?: (teamMemberId: number) => void;
  onDeny?: (teamMemberId: number) => void;
  onAccept?: (teamMemberId: number) => void;
  onReject?: (teamMemberId: number) => void;
}

const MemberItem: FC<IProps> = ({
  teamMemberId,
  nickname,
  gender,
  role,
  changeBtn,
  isChair,
  setChangeBtn = () => {},
  changeChair,
  onDeny,
  onAccept,
  onReject,
}) => {
  return (
    <div
      className={`flex flex-row justify-between items-center py-4 ${
        role === "총무" ? "" : "border-b-2 border-hanaGray"
      } `}
    >
      <div className="flex flex-row items-center">
        <img
          src={gender === "M" ? "/img/별돌이.png" : "/img/별순이.png"}
          alt="profile"
          className="w-12 h-12"
        />
        <p className="font-hanaRegular text-3xl ml-4">{nickname}</p>
        {gender === "M" ? (
          <MdMale color="#002CC9" size={18} />
        ) : (
          <MdFemale color="#DD0092" size={18} />
        )}
      </div>
      {role === "총무" && isChair ? (
        <div
          className="font-hanaMedium underline underline-offset-2 pr-3 text-xl"
          onClick={() => setChangeBtn(!changeBtn)}
        >
          총무변경
        </div>
      ) : role === "모임원" && isChair ? (
        <div className="flex flex-row gap-3 font-hanaRegular text-white cursor-pointer">
          <div
            className={`py-1 px-5 text-lg ${
              changeBtn ? "bg-hanaLightMint text-black" : "bg-hanaPink"
            } rounded-3xl`}
            onClick={
              changeBtn
                ? () => {
                    changeChair!(teamMemberId);
                  }
                : () => {
                    onReject!(teamMemberId);
                  }
            }
          >
            {changeBtn ? "임명하기" : "내보내기"}
          </div>
        </div>
      ) : role === "가입요청" ? (
        <div className="flex flex-row gap-3 font-hanaRegular text-lg text-white">
          <div
            className="py-1 px-7 bg-[#A891D9] rounded-3xl cursor-pointer"
            onClick={() => onDeny!(teamMemberId)}
          >
            거절
          </div>
          <div
            className="py-1 px-7 bg-[#65AFBF] rounded-3xl cursor-pointer"
            onClick={() => onAccept!(teamMemberId)}
          >
            수락
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MemberItem;
