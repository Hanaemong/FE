import { FC } from "react";
import chainCalc from "../../utils/chainCalc";
import { useNavigate } from "react-router-dom";

interface Iprops {
  teamId: number;
  name: string;
  image: string;
  category: string;
  member: number;
  rating: number;
  from: string;
}

const TeamItem: FC<Iprops> = ({
  teamId,
  name,
  image,
  category,
  member,
  rating,
  from,
}) => {
  const navigate = useNavigate();
  const onClickItem = () => {
    navigate("/team", {
      state: {
        teamId: teamId,
        from: from,
        memberCnt: member,
      },
    });
  };

  return (
    <div className="flex flex-row gap-4" onClick={() => onClickItem()}>
      <img
        src={image}
        alt="image"
        className="flex w-24 h-24 rounded-2xl justify-center items-center drop-shadow-md"
      />
      <div className="flex flex-col gap-2 py-2 justify-center">
        <p className="text-2xl font-hanaMedium">{name}</p>
        <div className="flex flex-row gap-6 font-hanaRegular items-center">
          <div className="rounded-2xl py-1 px-2 bg-[#EBEBEB] text-[#9E9E9E] w-24 text-center">
            {category}
          </div>
          <p>멤버 {member}</p>
          <div className="flex flex-row gap-1">
            <img
              src={`/img/${chainCalc(rating)}.png`}
              alt="chain"
              className="w-5 h-5"
            />
            <p>{rating.toFixed(1)}점</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamItem;
