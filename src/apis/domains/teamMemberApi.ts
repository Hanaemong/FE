import { ApiClient } from "../apiClient";

export class teamMemberApi extends ApiClient {
  private static instance: teamMemberApi;

  static getInstance(): teamMemberApi {
    return this.instance || (this.instance = new this());
  }

  async getTeamMember(teamId: number) {
    const response = await this._http.get<TeamMemberType[]>(
      `/teamMember/${teamId}`
    );
    return response;
  }

  async deleteTeamMember(teamMemberId: number) {
    const response = await this._http.delete(`/teamMember/${teamMemberId}`);
    return response;
  }

  async postChangeChair(teamMemberId: number) {
    const response = await this._http.post(`/teamMember/${teamMemberId}`);
    return response;
  }

  async updateTeamMember(teamMemberId: number) {
    const response = await this._http.put(`/teamMember/${teamMemberId}`);
    return response;
  }
}
