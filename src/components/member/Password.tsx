import { FC, useEffect, useState } from "react";
import { MdOutlineBackspace } from "react-icons/md";
import { shuffleArray } from "../../utils/shuffleArray";

interface IProps {
  confirm?: boolean;
  onPasswordComplete: (password: string) => void;
}

const Password: FC<IProps> = ({ confirm, onPasswordComplete }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [backspaceActive, setBackspaceActive] = useState<boolean>(false);
  const [shuffledNumbers, setShuffledNumbers] = useState<number[]>([]);
  const [password, setPassword] = useState<number[]>([]);

  const handleClick = (index: number) => {
    if (password.length < 6) {
      const newPassword = [...password, shuffledNumbers[index]];
      setPassword(newPassword);

      if (newPassword.length === 6) {
        setTimeout(() => {
          onPasswordComplete(newPassword.join(""));
          setPassword([]);
        }, 500);
      }
    }
    setActiveIndex(index);
    setTimeout(() => setActiveIndex(null), 500);
  };

  const handleBackspaceClick = () => {
    setPassword(password.slice(0, -1));
    setBackspaceActive(true);
    setTimeout(() => setBackspaceActive(false), 500);
  };

  useEffect(() => {
    setShuffledNumbers(shuffleArray([...Array(12).keys()]));
  }, []);

  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-between">
      <div className="w-full flex flex-col items-center">
        <div className="font-hanaMedium text-3xl mt-24 pb-20">
          간편비밀번호 입력
        </div>
        <div className="w-3/4 flex flex-row justify-evenly">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className={`size-7 rounded-full ${
                i < password.length
                  ? "bg-[#EBEBEB]"
                  : "border-[2.5px] border-[#EBEBEB]"
              }`}
            ></div>
          ))}
        </div>
        {confirm && (
          <div className="font-hanaMedium text-2xl text-center pt-10 text-red-600">
            비밀번호가 일치하지 않습니다.
          </div>
        )}
      </div>
      <div className="grid grid-cols-4 gap-12 text-4xl font-hanaBold">
        {shuffledNumbers.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-center w-20 h-20 text-center ${
              activeIndex === index ? "animate-flash" : ""
            }`}
            onClick={() => handleClick(index)}
          >
            {item === 10 ? (
              <img src="/public/img/별돌이1.png" className="size-10" />
            ) : item === 11 ? (
              <img src="/public/img/별돌이1.png" className="size-10" />
            ) : (
              item
            )}
          </div>
        ))}
        <div
          className={`col-start-4 flex items-center justify-center w-20 h-20 text-center ${
            backspaceActive ? "animate-flash" : ""
          }`}
          onClick={handleBackspaceClick}
        >
          <MdOutlineBackspace size={32} />
        </div>
      </div>
    </div>
  );
};

export default Password;
