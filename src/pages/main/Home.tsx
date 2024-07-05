import { HiMagnifyingGlass } from "react-icons/hi2";
import { PiMegaphone } from "react-icons/pi";
import { CategoryCard, TeamItem } from "../../components";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import categories from "../../utils/categories";
import { getCookie } from "../../utils/cookie";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { teamApi } from "../../apis/domains/teamApi";
import { useEffect } from "react";

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
            <img src="/img/banner_temp.png" alt="banner" />
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
