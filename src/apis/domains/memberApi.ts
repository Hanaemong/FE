import { ApiClient } from "../apiClient";

export class memberApi extends ApiClient {
  private static instance: memberApi;

  static getInstance(): memberApi {
    return this.instance || (this.instance = new this());
  }

  async postLogin(user: LoginType) {
    const response = await this._http.post<LoginResponseType>(
      `/member/login`,
      user
    );
    return response;
  }
}
