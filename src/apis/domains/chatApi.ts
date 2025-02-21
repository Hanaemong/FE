import { ApiClient } from "../apiClient";

export class chatApi extends ApiClient {
  private static instance: chatApi;

  static getInstance(): chatApi {
    return this.instance || (this.instance = new this());
  }

  async getChatHistory(teamId: number) {
    const response = await this.axiosInstance<ChatType[]>(`/chat/${teamId}`);
    return response;
  }

  async getLastChat(teamId: number) {
    const response = await this.axiosInstance<ChatType>(`/chat/last/${teamId}`);
    return response;
  }

  async getNickDupl(nickname: string) {
    const response = await this.axiosInstance<boolean>(
      `/chat/dupl?nickname=${nickname}`
    );
    return response;
  }
}
