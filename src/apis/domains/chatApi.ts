import { ApiClient } from "../apiClient";

export class chatApi extends ApiClient {
  private static instance: chatApi;

  static getInstance(): chatApi {
    return this.instance || (this.instance = new this());
  }

  async getChatHistory(teamId: number) {
    const response = await this._http.get(`/chat/${teamId}`);
    return response;
  }
}
