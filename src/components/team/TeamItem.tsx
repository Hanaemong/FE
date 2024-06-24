import { FC } from "react";
import chainCalc from "../../utils/chainCalc";

interface Iprops {
  name: string;
  image: string;
  category: string;
  member: number;
  rating: number;
}

const TeamItem: FC<Iprops> = ({ name, image, category, member, rating }) => {
  return (
    <div className="flex flex-row gap-4">
      <img
        src="/img/배드민턴.png"
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
