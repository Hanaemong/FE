import { ApiClient } from "../apiClient";

export class surveyApi extends ApiClient {
  private static instance: surveyApi;

  static getInstance(): surveyApi {
    return this.instance || (this.instance = new this());
  }

  async postSurvey(teamId: number, score: number) {
    const response = await this._http.post(`/survey/${teamId}`, {
      score: score,
    });
    return response;
  }

  async postRequestSurvey(teamId: number) {
    const response = await this._http.post(`/survey/request/${teamId}`);
    return response;
  }
}
