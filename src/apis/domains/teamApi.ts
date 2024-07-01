import { ApiClient } from "../apiClient";

export class teamApi extends ApiClient {
  private static instance: teamApi;

  static getInstance(): teamApi {
    return this.instance || (this.instance = new this());
  }

  async getEntireTeam() {
    const response = await this._http.get<TeamItemType[]>("/team");
    return response;
  }

  async postTeam(team: TeamCreateType) {
    const response = await this._http.post("/team", team);
    return response;
  }
}
