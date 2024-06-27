import { AlarmItem, Topbar } from "../../components";

const Alarm = () => {
  return (
    <section className="min-h-real-screen3">
      <Topbar title="알림" prohibit />
      <div className="w-full bg-custom-light-gradient h-[0.15rem]"></div>
      <div className="flex flex-col px-10 pb-7">
        <AlarmItem
          idx={1}
          title="방탈출 모임 설문조사 알림"
          date={new Date()}
          content="지금 당장 설문조사를 작성해주세요 ~!
          (48시간내에 등록하지 못하면 무효처리 됩니다.)"
        />
        <AlarmItem
          idx={1}
          title="방탈출 모임 설문조사 알림"
          date={new Date()}
          content="지금 당장 설문조사를 작성해주세요 ~!
          (48시간내에 등록하지 못하면 무효처리 됩니다.)"
        />
        <AlarmItem
          idx={1}
          title="방탈출 모임 설문조사 알림"
          date={new Date()}
          content="지금 당장 설문조사를 작성해주세요 ~!
          (48시간내에 등록하지 못하면 무효처리 됩니다.)"
        />
        <AlarmItem
          idx={1}
          title="방탈출 모임 설문조사 알림"
          date={new Date()}
          content="지금 당장 설문조사를 작성해주세요 ~!
          (48시간내에 등록하지 못하면 무효처리 됩니다.)"
        />
        <AlarmItem
          idx={1}
          title="방탈출 모임 설문조사 알림"
          date={new Date()}
          content="지금 당장 설문조사를 작성해주세요 ~!
          (48시간내에 등록하지 못하면 무효처리 됩니다.)"
        />
        <AlarmItem
          idx={1}
          title="방탈출 모임 설문조사 알림"
          date={new Date()}
          content="지금 당장 설문조사를 작성해주세요 ~!
          (48시간내에 등록하지 못하면 무효처리 됩니다.)"
        />
      </div>
    </section>
  );
};

export default Alarm;
