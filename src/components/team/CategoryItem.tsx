import { FC } from "react";

interface Iprops {
  index: number;
  name: string;
  image: string;
  onClick: (index: number) => void;
}

const CategoryItem: FC<Iprops> = ({ index, name, image, onClick }) => {
  return (
    <div
      className="flex justify-center items-center"
      onClick={() => {
        onClick(index);
      }}
    >
      <div className="flex flex-col w-24 h-24 justify-center items-center border-2 border-hanaSilver rounded-2xl gap-2">
        <img src={`/img/${image}.png`} alt="image" className="h-12 w-12" />
        <p className="font-hanaMedium">{name}</p>
      </div>
    </div>
  );
};
export default CategoryItem;
