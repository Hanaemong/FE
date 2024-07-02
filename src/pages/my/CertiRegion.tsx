import { useState } from "react";
import { Button, RegionItem, RegionModal, Topbar } from "../../components";
import { useNavigate } from "react-router-dom";

const CertiRegion = () => {
  const navigate = useNavigate();
  const [modal, openModal] = useState<boolean>(false);
  const [sigun, setSigun] = useState<string>("");
  const [sigungu, setSigungu] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);

  const selectSigun = (selectedSigun: string) => {
    setSigun(selectedSigun);
  };

  const selectSigungu = (selectedSigungu: string) => {
    setSigungu(selectedSigungu);
  };

  const regionHandler = () => {
    if (sigun && sigungu) {
      setRegion(`${sigun} ${sigungu}`);
    }
    openModal((prev) => !prev);
  };

  return (
    <>
      {modal && (
        <RegionModal sigun="시군" sigungu="시군구" onClose={regionHandler}>
          <div className="w-full flex justify-between">
            <div className="w-1/2 border-r-2 ">
              <RegionItem
                title="서울"
                onClick={() => selectSigun("서울")}
                region={sigun}
              />
              <RegionItem
                title="경기"
                onClick={() => selectSigun("경기")}
                region={sigun}
              />
              <RegionItem
                title="인천"
                onClick={() => selectSigun("인천")}
                region={sigun}
              />
            </div>
            <div className="w-1/2">
              <RegionItem
                title="고양시 일산서구"
                onClick={() => selectSigungu("고양시 일산서구")}
                region={sigungu}
              />
              <RegionItem
                title="창원시 마산 합포구"
                onClick={() => selectSigungu("창원시 마산 합포구")}
                region={sigungu}
              />
            </div>
          </div>
        </RegionModal>
      )}
      <section className="min-h-real-screen2 h-screen flex flex-col items-center relative z-10">
        <Topbar title="지역 인증" />
        <div className="h-full w-full flex flex-col items-center justify-between py-8 pb-16">
          <div className="w-5/6 flex flex-col items-center gap-6">
            <span className="w-full text-3xl font-hanaMedium text-left">
              지역을 선택해주세요
            </span>
            <div className="w-full flex justify-between gap-1">
              <input
                className="w-3/4 h-[4rem] rounded-2xl border border-spacing-1 text-left text-2xl font-hanaMedium px-4 text-[#979797]"
                type="button"
                value={region || "지역 선택"}
                onClick={() => {
                  openModal((prev) => !prev);
                }}
              />
              <button
                className="px-3 py-2 bg-hanaPurple rounded-2xl text-white font-hanaRegular text-xl"
                onClick={() => setIsActive(true)}
              >
                위치 확인
              </button>
            </div>
            <div className="w-full text-lg text-left font-hanaRegular text-[#979797]">
              선택 위치를 GPS로 인증을 받아와요
            </div>
          </div>
          <Button
            text="완료"
            isActive={isActive}
            onClick={() => {
              navigate("/my");
            }}
          />
        </div>
      </section>
    </>
  );
};

export default CertiRegion;
