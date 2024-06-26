import { useLocation } from "react-router-dom";
import { TeamItem, Topbar } from "../../components";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useRef, useState } from "react";
import HistoryItem from "../../components/team/HistoryItem";

const Search = () => {
  const location = useLocation();

  const locationState = location.state as {
    category: string;
  };

  const history = localStorage.getItem("history");

  const [refresh, setRefresh] = useState<boolean>(false);
  const [initial, setInitial] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const activeEnter = (e: any) => {
    if (e.key === "Enter") {
      inputRef.current!.value && onClickSearch(inputRef.current!.value);
    }
  };

  const onClickHistory = (keyword: string, index: number) => {
    inputRef.current!.value = keyword;
    onDeleteHistory(index);
    onClickSearch(keyword);
    // keyword로 검색 결과 변경
  };

  const onDeleteHistory = (index: number) => {
    let newHistory = JSON.parse(localStorage.getItem("history")!);
    newHistory.splice(index, 1);

    localStorage.setItem("history", JSON.stringify(newHistory));
    setRefresh(!refresh);
  };

  const onClickSearch = (keyword: string) => {
    // keyword로 검색 결과 변경
    let newHistory =
      history != null
        ? JSON.parse(localStorage.getItem("history")!)
        : new Array();

    newHistory.length === 5 && newHistory.splice(-1);
    newHistory.unshift(keyword);
    localStorage.setItem("history", JSON.stringify(newHistory));

    initial && setInitial(false);
  };

  return (
    <section className="min-h-real-screen2">
      <Topbar
        title={`${
          locationState == null ? "모임 검색" : `${locationState.category}`
        }`}
      />
      <div className="flex flex-col px-10 pt-4 gap-7">
        {!locationState && (
          <>
            {/* 검색 박스 */}
            <div className="flex felx-row w-full h-[4.5rem] bg-[#EBEBEB] border-2 border-[#A0A0A0] rounded-[2.5rem] px-7 items-center">
              <input
                type="text"
                className="w-full mr-4 h-12 bg-inherit font-hanaRegular text-2xl"
                placeholder="모임 이름으로 검색해보세요."
                onKeyDown={(e) => activeEnter(e)}
                maxLength={10}
                ref={inputRef}
              />
              <HiMagnifyingGlass
                size={25}
                onClick={() => onClickSearch(inputRef.current!.value)}
              />
            </div>

            {/* 최근 검색어 */}
            {history &&
              initial &&
              JSON.parse(localStorage.getItem("history")!).length > 0 && (
                <div className="flex flex-col">
                  <p className="text-xl font-hanaLight mb-3">최근 검색어</p>
                  <div className="flex flex-row gap-4 overflow-x-scroll scrollbar-hide">
                    {JSON.parse(history).map((item: string, index: number) => (
                      <HistoryItem
                        key={index}
                        index={index}
                        keyword={item}
                        onClick={onClickHistory}
                        onDelete={onDeleteHistory}
                      />
                    ))}
                  </div>
                </div>
              )}
          </>
        )}
        {/* 검색 결과 리스트 */}
        <div className="my-4 flex flex-col">
          <p className="font-hanaRegular text-2xl mb-4">
            <span className="text-hanaBlue">서울특별시</span>의 모임 리스트
          </p>
          <div className="flex flex-col gap-4 ">
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
    </section>
  );
};

export default Search;
