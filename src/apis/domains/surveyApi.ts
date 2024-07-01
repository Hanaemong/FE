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

  // 설문조사 요청 api 구현 필요
}
