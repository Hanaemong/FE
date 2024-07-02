import { ApiClient } from "../apiClient";

export class accountApi extends ApiClient {
  private static instance: accountApi;

  static getInstance(): accountApi {
    return this.instance || (this.instance = new this());
  }

  async getAccount() {
    const response = await this._http.get<AccountType>("/account");
    return response;
  }
}
