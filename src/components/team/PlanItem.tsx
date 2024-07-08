import { FC } from "react";
import { formatter3 } from "../../utils/datetimeFormat";
import { RiSurveyLine } from "react-icons/ri";

interface IProps {
  title: string;
  date: string;
  place: string;
  cost: number;
  image: string;
  outdated: boolean;
  isSurveyed: boolean;
  isChair: boolean;
  onRequest?: () => void;
}

const PlanItem: FC<IProps> = ({
  title,
  date,
  place,
  cost,
  image,
  outdated,
  isSurveyed,
  isChair,
  onRequest = () => {},
}) => {
  return (
    <div
      className={`w-full flex gap-20 p-7 bg-white rounded-3xl drop-shadow-lg ${
        outdated && "contrast-50"
      }`}
    >
      <div className="flex flex-col gap-4">
        <div className="w-40 font-hanaMedium text-2xl truncate">{title}</div>
        <div
          className="w-40 h-24 rounded-2xl bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </div>
      <div
        className={`w-64 ${!isChair && "mt-10"}  ${
          isChair && !outdated && "mt-10"
        } flex flex-col gap-3 font-hanaRegular text-xl`}
      >
        {isChair && outdated && (
          <div
            className="flex flex-row justify-end gap-2"
            onClick={() => {
              if (outdated) {
                onRequest();
              } else {
                alert("지난 일정에 대해서만 설문을 요청할 수 있습니다.");
              }
            }}
          >
            <RiSurveyLine
              size={18}
              className={`self-end ${isSurveyed && "text-hanaGray2"}  ${
                outdated && !isSurveyed && " text-hanaPurple"
              }`}
            />
            <div
              className={`${isSurveyed && "text-hanaGray2"} ${
                outdated && !isSurveyed && " text-hanaPurple"
              } `}
            >
              설문 요청하기
            </div>
          </div>
        )}
        <div className="flex justify-between">
          <div className="text-hanaSilver2">일시</div>
          <div className="text-right">{formatter3(new Date(date))}</div>
        </div>
        <div className="w-full flex justify-between truncate">
          <p className="text-hanaSilver2">장소</p>
          <p className="text-right w-48 truncate">{place}</p>
        </div>
        <div className="flex justify-between">
          <div className="text-hanaSilver2">비용</div>
          <div className="text-right">{cost.toLocaleString()}원</div>
        </div>
      </div>
    </div>
  );
};

export default PlanItem;
