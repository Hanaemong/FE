import { FC } from "react";
import categories from "../../utils/categories";
import CategoryItem from "./CategoryItem";

interface Iprops {
  onClick: (index: number) => void;
}

const CategoryCard: FC<Iprops> = ({ onClick }) => {
  return (
    <>
      {categories.map((item, index) => (
        <CategoryItem
          key={index}
          index={index}
          name={item.name}
          image={item.image}
          onClick={onClick}
        />
      ))}
    </>
  );
};

export default CategoryCard;
