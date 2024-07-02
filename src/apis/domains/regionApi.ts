import { ApiClient } from "../apiClient";

export class regionApi extends ApiClient {
  private static instance: regionApi;

  static getInstance(): regionApi {
    return this.instance || (this.instance = new this());
  }

  async getSigun() {
    const response = await this._http.get<SigunType[]>("/sigun");
    return response.data;
  }

  async getSigungu(siGunId: number) {
    const response = await this._http.get<SigunguType[]>(`/sigun/${siGunId}`);
    return response.data;
  }

  async postRegionCheck({
    latitude,
    longitude,
    siGunId,
    siGunGuId,
  }: CheckRegionType) {
    const response = await this._http.post<CheckRegionResponseType>(
      `/member/regionCheck`,
      { latitude, longitude, siGunId, siGunGuId }
    );
    return response;
  }
}
