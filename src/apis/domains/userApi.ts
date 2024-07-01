import { ApiClient } from "../apiClient";

export class userApi extends ApiClient {
  static getInstance(): ApiClient {
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
}
