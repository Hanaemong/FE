import { FC } from "react";
import { formatter } from "../../utils/datetimeFormat";
import { useNavigate } from "react-router-dom";

interface Iprops {
  teamId: number;
  title: string;
  content: string;
  image: string | null;
  date: Date;
  isSeen: boolean;
  type: string;
}

const AlarmItem: FC<Iprops> = ({
  teamId,
  title,
  content,
  image,
  date,
  isSeen,
  type,
}) => {
  const navigate = useNavigate();

  const onClickItem = () => {
    if (type === "SURVEY") {
      navigate("/survey", {
        state: {
          teamId: teamId,
        },
      });
    }
  };

  return (
    <div
      className={`flex flex-col h-40 justify-between py-4 gap-4 ${
        type === "SURVEY" && !isSeen && "cursor-pointer"
      }`}
      onClick={() => {
        type === "SURVEY" && !isSeen && onClickItem();
      }}
    >
      <div className="flex flex-row gap-7">
        <img
          src={image == null ? "/img/vip.png" : image}
          alt="image"
          className="size-20"
        />
        <div className="flex flex-col w-full gap-5">
          <div className="flex flex-row justify-between items-center">
            <p
              className={`text-2xl font-hanaBold line-clamp-1 ${
                isSeen && "text-hanaSilver2"
              } `}
            >
              {title}
            </p>
            <p className="text-xl font-hanaLight">{formatter(date)}</p>
          </div>
          <span className="text-xl font-hanaRegular w-11/12 line-clamp-2">
            {content}
          </span>
        </div>
      </div>
      <div className="w-full bg-gray-200 h-[0.1rem]"></div>
    </div>
  );
};

export default AlarmItem;
