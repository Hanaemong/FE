import { HiMagnifyingGlass } from "react-icons/hi2";
import { PiMegaphone } from "react-icons/pi";
import { CategoryCard, TeamItem } from "../../components";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import categories from "../../utils/categories";
import { getCookie } from "../../utils/cookie";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { teamApi } from "../../apis/domains/teamApi";
import { useEffect, useRef, useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: teams,
    error,
    isError,
  } = useQuery({
    queryKey: ["teams"],
    queryFn: () => {
      const res = teamApi.getInstance().getEntireTeam();
      return res;
    },
  });

  const onClickCategory = (index: number) => {
    navigate("/search", {
      state: {
        category: categories[index].name,
      },
    });
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["teams"] });
  }, []);

  useEffect(() => {
    if (isError) {
      console.log(error.message);
      alert("모임을 불러오는 데 실패했습니다.");
    }
  }, [isError]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const slideItems = [
    "/img/banner1.png",
    "/img/banner2.png",
    "/img/banner3.png",
    "/img/banner4.png",
  ];

  useEffect(() => {
    const handleResize = () => {
      setCurrentTranslate(0);
      setPrevTranslate(0);
      setCurrentIndex(0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition(event.clientX);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDragging) {
      const currentPosition = event.clientX;
      const diff = currentPosition - startPosition;
      setCurrentTranslate(prevTranslate + diff);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentIndex < slideItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }

    if (movedBy > 100 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    setPrevTranslate(currentIndex * -sliderRef.current!.offsetWidth);
    setCurrentTranslate(currentIndex * -sliderRef.current!.offsetWidth);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  const handleSlide = (index: number) => {
    setCurrentIndex(index);
    const newTranslate = index * -sliderRef.current!.offsetWidth;
    setPrevTranslate(newTranslate);
    setCurrentTranslate(newTranslate);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.style.transform = `translateX(${currentTranslate}px)`;
      slider.style.transition = "transform 0.3s ease-out";
    }
  }, [currentTranslate]);

  return (
    <section className="relative min-h-real-screen bg-hanaGray">
      <div className="flex flex-col gap-4">
        {/* 카드 영역 */}
        <div className="w-full h-96 bg-custom-light-gradient">
          <div className="flex flex-col p-7 gap-7">
            <div className="flex flex-row justify-between mt-4 px-2">
              <div className="flex justify-center items-center gap-3">
                <img
                  src="/img/logo_circle.png"
                  alt="logo"
                  className="w-8 h-8"
                />
                <p className="text-3xl font-hanaBold">{getCookie("siGunGu")}</p>
              </div>
              <div className="flex justify-center items-center gap-7">
                <HiMagnifyingGlass
                  size={20}
                  className="cursor-pointer"
                  onClick={() => navigate("/search")}
                />
                <PiMegaphone size={20} />
              </div>
            </div>
            {/* 캐러셀 구역 */}
            <div className="w-full max-w-4xl mx-auto overflow-hidden relative">
              <div
                ref={sliderRef}
                className="flex transition-transform duration-300 ease-out"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                {slideItems.map((item, index) => (
                  <div
                    key={index}
                    className="w-full h-64 rounded-xl bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url(${item})` }}
                  />
                ))}
              </div>
              {/* 슬라이드 인디케이터 */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-4">
                {slideItems.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
                      currentIndex === index ? "bg-gray-800" : "bg-gray-400"
                    }`}
                    onClick={() => handleSlide(index)}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-7 gap-7">
          {/* 카테고리 영역 */}
          <div className="w-full h-72 rounded-3xl bg-white grid grid-cols-4 gap-2 p-7">
            <CategoryCard onClick={onClickCategory} />
          </div>
          {/* 체인 등급이 높은 모임 */}
          <div className="w-full px-7 pt-8 pb-12 flex flex-col gap-4 bg-white rounded-3xl">
            <p className="text-3xl font-hanaMedium ml-2">
              체인 등급이 높은 모임
            </p>
            <div className="flex flex-col gap-4">
              {teams?.data!.map((item, index) => (
                <TeamItem
                  key={index}
                  teamId={item.teamId}
                  name={item.teamName}
                  image={item.thumbNail}
                  category={item.category}
                  member={item.memberCnt}
                  rating={item.score}
                  from="home"
                />
              ))}
              {teams?.data!.length == 0 && (
                <p className="w-full pt-16 text-center text-3xl font-hanaLight">
                  현재 지역에 모임이 존재하지 않아요 :(
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed flex bottom-36 right-10">
        <div
          className="flex w-20 h-20 bg-custom-gradient rounded-full justify-center items-center"
          onClick={() => navigate("/create-team")}
        >
          <GoPlus color="ffffff" size={40} />
        </div>
      </div>
    </section>
  );
};

export default Home;
