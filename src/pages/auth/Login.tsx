import { useState } from "react";
import { Password } from "../../components";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../../utils/cookie";
import { useMutation } from "@tanstack/react-query";
import { memberApi } from "../../apis/domains/memberApi";

const Login = () => {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState<boolean>(true);

  const phone = getCookie("phone");

  const { mutate: login, data } = useMutation({
    mutationFn: (user: LoginType) => {
      return memberApi.getInstance().postLogin(user);
    },
    onSuccess: (response) => {
      console.log(data);
      console.log(response.data?.siGunGu!);
      setCookie("token", response.data?.accessToken!);
      setCookie("siGunGu", response.data?.siGunGu!);
      navigate("/home");
    },
    onError: (err) => {
      console.log(err.message);
      setConfirm(false);
    },
  });

  const onPasswordComplete = (password: string) => {
    login({ phone, password });
  };

  return (
    <section className="min-h-screen">
      <div className="h-full w-full flex flex-col items-center justify-between py-8 pb-16">
        <div className="w-5/6 mt-20 px-6 flex flex-col items-center gap-6">
          <Password
            onPasswordComplete={onPasswordComplete}
            join={true}
            confirm={confirm}
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
