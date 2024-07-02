import { FC } from "react";
import { MdFemale, MdMale } from "react-icons/md";

interface IProps {
  name: string;
  gender: string;
  role: string;
  changeBtn?: boolean;
  isChair?: boolean;
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
  isChair,
  setChangeBtn = () => {},
}) => {
  //   const [changeBtn, setChangeBtn] = useState<boolean>(false);

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
        <p className="font-hanaRegular text-3xl ml-4">{name}</p>
        {gender === "M" ? (
          <MdMale color="#002CC9" size={18} />
        ) : (
          <MdFemale color="#DD0092" size={18} />
        )}
      </div>
      {role === "총무" && isChair ? (
        <div
          className="font-hanaMedium underline underline-offset-2 pr-3"
          onClick={() => setChangeBtn(!changeBtn)}
        >
          총무변경
        </div>
      ) : role === "모임원" && isChair ? (
        <div className="flex flex-row gap-3 font-hanaRegular text-white">
          <button
            className={`py-1 px-5 text-lg ${
              changeBtn ? "bg-hanaLightMint text-black" : "bg-hanaPink"
            } rounded-3xl`}
          >
            {changeBtn ? "임명하기" : "내보내기"}
          </button>
        </div>
      ) : role === "가입요청" ? (
        <div className="flex flex-row gap-3 font-hanaRegular text-lg text-white">
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
