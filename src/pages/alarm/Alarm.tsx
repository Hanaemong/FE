import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AlarmItem, Topbar } from "../../components";
import { alarmApi } from "../../apis/domains/alarmApi";
import { useEffect } from "react";

const Alarm = () => {
  const queryClient = useQueryClient();

  const {
    data: alarms,
    error,
    isError,
  } = useQuery({
    queryKey: ["alarms"],
    queryFn: () => {
      const res = alarmApi.getInstance().getAlarmList();
      return res;
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["alarms"] });
  }, []);

  useEffect(() => {
    if (isError) {
      console.log(error.message);
      alert("알람을 불러오는 데 실패했습니다.");
    }
  }, [isError]);

  return (
    <section className="min-h-real-screen3">
      <Topbar title="알림" prohibit />
      <div className="w-full bg-custom-light-gradient h-[0.15rem]"></div>
      <div className="flex flex-col px-10 pt-4 pb-7">
        {alarms?.data?.map((item, index) => (
          <AlarmItem
            key={index}
            teamId={item.teamId}
            title={item.title}
            content={item.body}
            image={item.image}
            date={new Date(item.createdAt)}
            isSeen={item.isSeen}
            type={item.type}
          />
        ))}
      </div>
    </section>
  );
};

export default Alarm;
