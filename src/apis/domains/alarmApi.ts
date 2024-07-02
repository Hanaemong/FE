import { ApiClient } from "../apiClient";

export class alarmApi extends ApiClient {
  private static instance: alarmApi;

  static getInstance(): alarmApi {
    return this.instance || (this.instance = new this());
  }

  async getAlarmList() {
    const response = await this._http.get<AlarmType[]>("/alarm");
    return response;
  }
}
