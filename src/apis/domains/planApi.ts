import { ApiClient } from "../apiClient";

export class planApi extends ApiClient {
  private static instance: planApi;

  static getInstance(): planApi {
    return this.instance || (this.instance = new this());
  }

  async postPlan(req: { teamId: number; plan: FormData }) {
    const response = await this._http2.post(`/plan/${req.teamId}`, req.plan);
    return response;
  }

  async getPlan(teamId: number) {
    const response = await this._http.get<PlanResType[]>(`/plan/${teamId}`);
    return response;
  }
}
