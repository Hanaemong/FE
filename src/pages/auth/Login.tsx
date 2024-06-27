import React, { useState } from "react";
import { Password } from "../../components";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [pwd, setPwd] = useState<string>("");

  const onPasswordComplete = (password: string) => {
    setPwd(password);
    navigate("/home");
  };

  return (
    <section className="min-h-screen">
      <div className="h-full w-full flex flex-col items-center justify-between py-8 pb-16">
        <div className="w-5/6 mt-20 px-6 flex flex-col items-center gap-6">
          <Password onPasswordComplete={onPasswordComplete} join={true} />
        </div>
      </div>
    </section>
  );
};

export default Login;
