import { ApiClient } from "../apiClient";

export class planApi extends ApiClient {
  private static instance: planApi;

  static getInstance(): planApi {
    return this.instance || (this.instance = new this());
  }

  async postPlan(teamId: number, plan: PlanType) {
    const response = await this._http.post(`/plan/${teamId}`, plan);
    return response;
  }
}
