import { ApiClient } from "../apiClient";

export class teamApi extends ApiClient {
  private static instance: teamApi;

  static getInstance(): teamApi {
    return this.instance || (this.instance = new this());
  }

  async getTeamDetail(teamId: number) {
    const response = await this._http.get<TeamDetailType>(`/team/${teamId}`);
    return response;
  }

  async getMyTeam() {
    const response = await this._http.get<TeamItemType[]>("/team/my");
    return response;
  }

  async getEntireTeam() {
    const response = await this._http.get<TeamItemType[]>("/team");
    return response;
  }

  async postCreateTeam(team: FormData) {
    const response = await this._http2.post("/team", team);
    return response;
  }

  async postJoinTeam(teamId: number, hello: string) {
    const response = await this._http.post(`/team/${teamId}`, { hello: hello });
    return response;
  }

  async getSearchTeam(keyword: string) {
    const response = await this._http.get<TeamItemType[]>(
      `/team/search?keyword=${keyword}`
    );
    return response;
  }

  async getCategoryTeam(keyword: string) {
    const response = await this._http.get<TeamItemType[]>(
      `/team/category?keyword=${keyword}`
    );
    return response;
  }

  async updateBanner(teamId: number, banner: FormData) {
    const response = await this._http2.put(`/team/${teamId}`, banner);
    return response;
  }
}
