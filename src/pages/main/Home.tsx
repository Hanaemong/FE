import { HiMagnifyingGlass } from "react-icons/hi2";
import { PiMegaphone } from "react-icons/pi";
import { CategoryItem, TeamItem } from "../../components";
import categories from "../../utils/categories";
import { GoPlus } from "react-icons/go";

const Home = () => {
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
                <p className="text-3xl font-hanaBold">혜화동</p>
              </div>
              <div className="flex justify-center items-center gap-7">
                <HiMagnifyingGlass size={20} />
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
            {categories.map((item, index) => (
              <CategoryItem key={index} name={item.name} image={item.image} />
            ))}
          </div>
          {/* 체인 등급이 높은 모임 */}
          <div className="w-full px-7 py-10 flex flex-col gap-4 bg-white rounded-3xl">
            <p className="text-3xl font-hanaMedium pl-2">
              체인 등급이 높은 모임
            </p>
            <TeamItem
              name="배드민턴 동호회"
              image="temp"
              category="운동/스포츠"
              member={70}
              rating={4.0}
            />
            <TeamItem
              name="소소한 문화생활"
              image="temp"
              category="공연/문화"
              member={15}
              rating={3.5}
            />
            <TeamItem
              name="하나은행 면접 스터디"
              image="temp"
              category="자기계발"
              member={50}
              rating={4.2}
            />
            <TeamItem
              name="배드민턴 동호회"
              image="temp"
              category="운동/스포츠"
              member={30}
              rating={2.5}
            />
          </div>
        </div>
      </div>
      <div className="sticky flex bottom-0 right-0">
        <div className="flex w-28 h-28 bg-custom-gradient rounded-full justify-center items-center">
          <GoPlus color="ffffff" size={50} />
        </div>
      </div>
    </section>
  );
};

export default Home;
