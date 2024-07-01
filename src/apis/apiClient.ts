import axios, { AxiosInstance } from "axios";
import { getCookie } from "../utils/cookie";

export class ApiClient {
  protected axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = this.createAxiosInstance();
  }

  // static getInstance(): ApiClient {
  //   return this.instance || (this.instance = new this());
  // }

  logout() {
    this.axiosInstance = this.createAxiosInstance();
  }

  // async postLogin(user: { phone: string; password: string }) {
  //   const response = await this.axiosInstance.request<{
  //     accessToken: string;
  //     memberId: number;
  //   }>({
  //     method: "post",
  //     url: "/member/login",
  //     data: user,
  //   });
  //   return response.data;
  // }

  private createAxiosInstance = () => {
    const headers: any = {
      "content-type": "application/json",
    };

    const newInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: 100000,
      headers,
    });

    newInstance.interceptors.request.use(
      (config) => {
        const TOKEN = getCookie("token");
        if (TOKEN) {
          config.headers["Authorization"] = `Bearer ${TOKEN}`;
        }

        config.headers["Content-Type"] = "application/json";
        return config;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );

    return newInstance;
  };
}
