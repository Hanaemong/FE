import { useMutation } from "@tanstack/react-query";
import { memberApi } from "../apis/domains/memberApi";

export const Hello = () => {
  const { mutate: login, data } = useMutation({
    mutationFn: (user: { phone: string; password: string }) => {
      return memberApi.getInstance().postLogin(user);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <>
      <div
        className="w-48 h-48 bg-black"
        onClick={() => login({ phone: "010-1234-1233", password: "123456" })}
      ></div>
    </>
  );
};
