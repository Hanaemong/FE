import { useState } from "react";
import { GoPerson } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LiaHomeSolid } from "react-icons/lia";
import { PiWechatLogo } from "react-icons/pi";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  const [selected, setSelected] = useState<number>(1);

  return (
    <div>
      <div className="min-h-real-screen">
        <Outlet />
      </div>
      <div className="sticky w-full bottom-0 z-20 flex items-end text-2xl max-w-[500px] h-[75px] shadow-inner">
        <div className="flex flex-row  w-full justify-around gap-20 items-center bg-white drop-shadow-xl py-4 px-7">
          <div
            className={`text-3xl font-hanaRegular ${
              selected == 1 && "text-hanaPurple"
            }`}
            onClick={() => setSelected(1)}
          >
            <Link
              to="/home"
              className="flex flex-col justify-center items-center"
            >
              <LiaHomeSolid size={30} />
              <p>홈</p>
            </Link>
          </div>
          <div
            className={`text-3xl font-hanaRegular ${
              selected == 2 && "text-hanaPurple"
            }`}
            onClick={() => setSelected(2)}
          >
            <Link
              to="/alarm"
              className="flex flex-col justify-center items-center"
            >
              <IoMdNotificationsOutline size={30} />
              <p>알림</p>
            </Link>
          </div>
          <div
            className={`flex flex-col justify-center items-center text-3xl font-hanaRegular ${
              selected == 3 && "text-hanaPurple"
            }`}
            onClick={() => setSelected(3)}
          >
            <Link to="/chats">
              <PiWechatLogo size={30} />
              <p>채팅</p>
            </Link>
          </div>
          <div
            className={`flex flex-col justify-center items-center text-3xl font-hanaRegular ${
              selected == 4 && "text-hanaPurple "
            }`}
            onClick={() => setSelected(4)}
          >
            <Link to="/my">
              <GoPerson size={30} />
              <p>MY</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
