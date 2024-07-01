import { FC, useState } from "react";
import { MdFemale, MdMale } from "react-icons/md";

interface IProps {
  name: string;
  gender: string;
  role: string;
  changeBtn?: boolean;
  setChangeBtn?: (value: boolean) => void;
  changeLeader?: () => void;
  onRefuse?: () => void;
  onAccept?: () => void;
  onExpel?: () => void;
}

const MemberItem: FC<IProps> = ({
  name,
  gender,
  role,
  changeBtn,
  setChangeBtn = () => {},
}) => {
  //   const [changeBtn, setChangeBtn] = useState<boolean>(false);

  return (
    <div
      className={`flex flex-row justify-between items-center ${
        role === "총무" ? "" : "pb-1 border-b-2 border-hanaGray"
      } `}
    >
      <div className="flex flex-row items-center">
        <img
          src={gender === "M" ? "/img/별돌이.png" : "/img/별순이.png"}
          alt="profile"
          className="w-12 h-12"
        />
        <p className="font-hanaRegular text-2xl ml-4">{name}</p>
        {gender === "M" ? (
          <MdMale color="#002CC9" size={18} />
        ) : (
          <MdFemale color="#DD0092" size={18} />
        )}
      </div>
      {role === "총무" ? (
        <div
          className="font-hanaMedium underline underline-offset-2 pr-3"
          onClick={() => setChangeBtn(!changeBtn)}
        >
          총무변경
        </div>
      ) : role === "모임원" ? (
        <div className="flex flex-row gap-3 font-hanaRegular">
          <button className="py-1 px-5 bg-[#F5C4EA] rounded-3xl">
            {changeBtn ? "임명하기" : "내보내기"}
          </button>
        </div>
      ) : role === "가입요청" ? (
        <div className="flex flex-row gap-3 font-hanaRegular">
          <button className="py-1 px-7 bg-[#A891D9] rounded-3xl">거절</button>
          <button className="py-1 px-7 bg-[#65AFBF] rounded-3xl">수락</button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MemberItem;
