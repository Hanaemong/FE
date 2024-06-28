import React, { useRef, useState } from "react";
import { Button, Topbar } from "../../components";
import {
  PiCalendarDots,
  PiCurrencyKrw,
  PiImage,
  PiMapPinLight,
} from "react-icons/pi";
import { GoClock } from "react-icons/go";

const Plan = () => {
  return (
    <section>
      <Topbar title="일정 개설" />
      <div className="min-h-real-screen2 flex flex-col pb-12 justify-between items-center">
        <div className="w-full flex flex-col p-7 gap-7">
          <input
            placeholder="일정 이름"
            className="w-full rounded-2xl p-5 bg-hanaGray font-hanaRegular placeholder:text-hanaSilver2 placeholder:text-3xl text-3xl"
          />
          <div className="flex items-center gap-10">
            <PiCalendarDots size={32} />
            <input
              type="date"
              placeholder="2024-01-01"
              required
              className="w-full rounded-2xl p-5 bg-hanaGray font-hanaRegular placeholder:text-3xl text-3xl"
            />
          </div>
          <div className="flex items-center gap-10">
            <GoClock size={32} />
            <input
              type="time"
              placeholder="오전 00:00"
              required
              className="w-full rounded-2xl p-5 bg-hanaGray font-hanaRegular placeholder:text-3xl text-3xl"
            />
          </div>
          <div className="flex items-center gap-10">
            <PiMapPinLight size={32} />
            <input
              placeholder="장소"
              maxLength={15}
              className="w-full rounded-2xl p-5 bg-hanaGray font-hanaRegular placeholder:text-hanaSilver2 placeholder:text-3xl text-3xl"
            />
          </div>
          <div className="flex items-center gap-10">
            <PiCurrencyKrw size={32} />
            <input
              placeholder="비용"
              type="number"
              className="w-full rounded-2xl p-5 bg-hanaGray font-hanaRegular placeholder:text-hanaSilver2 placeholder:text-3xl text-3xl"
            />
          </div>
          <div className="flex items-center gap-10">
            <PiImage size={32} />
            일정 사진
          </div>
        </div>
        <Button text="일정 개설하기" onClick={() => {}} />
      </div>
    </section>
  );
};

export default Plan;
