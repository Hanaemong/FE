import { useEffect, useState } from "react";
import { Button, RegionItem, RegionModal, Topbar } from "../../components";
import { useNavigate } from "react-router-dom";
import { useGeolocation } from "../../hooks/useGeolocation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { regionApi } from "../../apis/domains/regionApi";
import { memberApi } from "../../apis/domains/memberApi";
import { setCookie } from "../../utils/cookie";

const geolocationOptions = {
  enableHighAccuracy: false,
  timeout: 0,
};

const CertiRegion = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { location } = useGeolocation(geolocationOptions);

  const [modal, openModal] = useState<boolean>(false);
  const [sigun, setSigun] = useState<{ id: number; name: string }>({
    id: 1,
    name: "",
  });
  const [sigungu, setSigungu] = useState<{ id: number; name: string }>();
  const [region, setRegion] = useState<string>("");
  const [regionCheckResult, setRegionCheckResult] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);

  const { data: siguns } = useQuery({
    queryKey: ["sigun"],
    queryFn: () => {
      const res = regionApi.getInstance().getSigun();
      return res;
    },
  });

  const { data: sigungus } = useQuery({
    queryKey: ["sigungu"],
    queryFn: () => {
      const res = regionApi.getInstance().getSigungu(sigun?.id!);
      return res;
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["sigungu"] });
  }, [sigun]);

  const { mutate: checkRegion, data } = useMutation({
    mutationFn: (region: CheckRegionType) => {
      return regionApi.getInstance().postRegionCheck(region);
    },
    onSuccess: (response) => {
      console.log(response);
      if (response.data?.match) {
        setRegionCheckResult("위치가 인증되었습니다");
        setIsActive(true);
      } else {
        setRegionCheckResult("선택한 지역과 일치하지 않습니다");
      }
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const { mutate: changeRegion } = useMutation({
    mutationFn: (region: UpdateRegionReqType) => {
      return memberApi.getInstance().updateRegion(region);
    },
    onSuccess: (response) => {
      console.log(response);
      setCookie("siGunGu", sigungu?.name!);
      navigate("/my");
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const selectSigun = (id: number, name: string) => {
    setSigun({ id, name });
  };

  const selectSigungu = (id: number, name: string) => {
    setSigungu({ id, name });
  };

  const regionHandler = () => {
    if (sigun && sigungu) {
      setRegion(`${sigun.name} ${sigungu.name}`);
    }
    openModal((prev) => !prev);
  };

  const getCurrentRegion = () => {
    const latitude = location?.latitude!;
    const longitude = location?.longitude!;
    console.log(latitude);
    console.log(longitude);

    setRegionCheckResult("");
    setIsActive(false);

    checkRegion({
      latitude,
      longitude,
      siGunId: sigun.id,
      siGunGuId: sigungu?.id!,
    });
  };

  return (
    <>
      {modal && (
        <RegionModal sigun="시군" sigungu="시군구" onClose={regionHandler}>
          <div className="w-full flex justify-between">
            <div className="w-1/2 border-r-2 ">
              {siguns?.map((item, index) => (
                <RegionItem
                  key={index}
                  title={item.siGun}
                  onClick={() => selectSigun(item.siGunId, item.siGun)}
                  region={sigun?.name!}
                />
              ))}
            </div>
            <div className="w-1/2">
              {sigungus?.map((item, index) => (
                <RegionItem
                  key={index}
                  title={item.siGunGu}
                  onClick={() => selectSigungu(item.siGunGuId, item.siGunGu)}
                  region={sigungu?.name!}
                />
              ))}
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
                className={`w-3/4 h-[4rem] rounded-2xl border ${
                  data?.success && data.data?.match && "border-blue-500"
                } ${
                  data?.success && !data.data?.match && "border-red-500"
                } border-spacing-1 text-left text-2xl font-hanaMedium px-4 text-[#979797]`}
                type="button"
                value={region || "지역 선택"}
                onClick={() => {
                  openModal((prev) => !prev);
                }}
              />
              <button
                className="px-3 py-2 bg-hanaPurple rounded-2xl text-white font-hanaRegular text-xl"
                onClick={getCurrentRegion}
              >
                위치 확인
              </button>
            </div>
            {regionCheckResult === "" ? (
              <div className="w-full text-lg text-left font-hanaRegular text-[#979797]">
                선택 위치를 GPS로 인증을 받아와요
              </div>
            ) : (
              <div
                className={`w-full text-lg text-left font-hanaRegular ${
                  data?.data?.match === true ? "text-blue-500" : "text-red-500"
                } `}
              >
                {regionCheckResult}
              </div>
            )}
          </div>
          <Button
            text="완료"
            isActive={isActive}
            onClick={() => {
              changeRegion({
                siGunId: sigun.id,
                siGunGuId: sigungu?.id!,
              });
            }}
          />
        </div>
      </section>
    </>
  );
};

export default CertiRegion;
