import { ApiClient } from "../apiClient";

export class userApi extends ApiClient {
  protected static instance: userApi;

  static getInstance(): userApi {
    return this.instance || (this.instance = new this());
  }

  async postLogin(user: { phone: string; password: string }) {
    const response = await this.axiosInstance.request<{
      accessToken: string;
      memberId: number;
    }>({
      method: "post",
      url: "/member/login",
      data: user,
    });
    return response.data;
  }

  async postLogin2(user: { phone: string; password: string }) {
    const response = await this._http.post<{
      accessToken: string;
      memberId: number;
    }>(`/member/login`, user);
    return response;
  }
}
