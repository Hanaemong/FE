import { useLocation } from "react-router-dom";
import { TeamItem, Topbar } from "../../components";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import HistoryItem from "../../components/team/HistoryItem";
import { getCookie } from "../../utils/cookie";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { teamApi } from "../../apis/domains/teamApi";

const Search = () => {
  const location = useLocation();
  const history = localStorage.getItem("history");
  const queryClient = useQueryClient();

  const locationState = location.state as {
    category: string;
  };

  const [refresh, setRefresh] = useState<boolean>(false);
  const [initial, setInitial] = useState<boolean>(true);
  const [teamList, setTeamList] = useState<TeamItemType[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [category, setCateogry] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const listQuery = useQuery({
    queryKey: ["teamList", keyword, category],
    queryFn: () => {
      if (locationState && locationState.category) {
        const res = teamApi
          .getInstance()
          .getCategoryTeam(locationState.category);
        return res;
      } else if (keyword !== "") {
        const res = teamApi.getInstance().getSearchTeam(keyword);
        return res;
      } else {
        const res = teamApi.getInstance().getEntireTeam();
        return res;
      }
    },
  });

  const activeEnter = (e: any) => {
    if (e.key === "Enter") {
      inputRef.current!.value && onClickSearch(inputRef.current!.value);
    }
  };

  const onClickHistory = (keyword: string, index: number) => {
    inputRef.current!.value = keyword;
    onDeleteHistory(index);
    onClickSearch(keyword);
    setKeyword(keyword);
  };

  const onDeleteHistory = (index: number) => {
    let newHistory = JSON.parse(localStorage.getItem("history")!);
    newHistory.splice(index, 1);

    localStorage.setItem("history", JSON.stringify(newHistory));
    setRefresh(!refresh);
  };

  const onClickSearch = (keyword: string) => {
    setKeyword(keyword);
    let newHistory: Array<string> =
      history != null
        ? JSON.parse(localStorage.getItem("history")!)
        : new Array();

    if (!newHistory.includes(keyword)) {
      newHistory.length === 5 && newHistory.splice(-1);
      newHistory.unshift(keyword);
    }

    localStorage.setItem("history", JSON.stringify(newHistory));

    initial && setInitial(false);
  };

  useEffect(() => {
    if (locationState && locationState.category) {
      setCateogry(locationState.category);
    }
    queryClient.resetQueries({ queryKey: ["teamList"] });
    queryClient.invalidateQueries({ queryKey: ["teamList"] });
  }, []);

  // 여기가 잘못됨
  useEffect(() => {
    if (!!listQuery.data?.data) {
      setTeamList(listQuery.data.data!);
    }
  }, [listQuery.data]);

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
          <p
            className="font-hanaRegular text-2xl mb-4"
            onClick={() => {
              console.log(listQuery.data, keyword);
              console.log(listQuery.isLoading);
            }}
          >
            <span className="text-hanaBlue">{getCookie("siGunGu")}</span>의 모임
            리스트
          </p>
          <div className="flex flex-col gap-4">
            {listQuery.isLoading && (
              <p className="w-full pt-16 text-center text-3xl font-hanaLight">
                데이터를 불러오고 있어요!
              </p>
            )}
            {!listQuery.isLoading && (
              <>
                {teamList.map((item, index) => (
                  <TeamItem
                    key={index}
                    teamId={item.teamId}
                    name={item.teamName}
                    image={item.thumbNail}
                    category={item.category}
                    member={item.memberCnt}
                    rating={item.score}
                  />
                ))}
                {teamList.length === 0 && (
                  <p className="w-full pt-16 text-center text-3xl font-hanaLight">
                    {locationState && locationState.category
                      ? "해당 카테고리의 모임이 존재하지 않아요 :("
                      : !initial
                      ? "해당 검색어의 모임이 존재하지 않아요 :("
                      : "현재 지역에 모임이 존재하지 않아요 :("}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
