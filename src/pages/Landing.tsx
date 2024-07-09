import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getCookie, setCookie } from "../utils/cookie";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setCookie("fcmToken", "");

    const timeout = setTimeout(() => {
      if (getCookie("phone")) {
        navigate("/login");
      } else {
        navigate("/join");
      }
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="h-screen bg-custom-gradient opacity-80">
      <div className="flex flex-col justify-center items-center h-full w-full gap-32">
        <img
          src="/img/link.png"
          alt="link"
          className={`w-72 h-72 animate-fadeinbounceleft`}
        />
        <p
          className={`text-[4.0rem] text-center font-hanaBold text-white drop-shadow-lg 
                animate-fadeinbounceright
              `}
        >
          하나링크
        </p>
      </div>
    </section>
  );
};

export default Landing;
