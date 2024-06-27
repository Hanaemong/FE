import { FC } from "react";

interface IProps {
  title: string;
  region: string;
  onClick: () => void;
}

const RegionItem: FC<IProps> = ({ title, region, onClick }) => {
  return (
    <div
      className={`text-center font-hanaRegular text-xl py-3
        ${title === region && "text-hanaPurple border border-hanaPurple"}
        `}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default RegionItem;
