import { ApiClient } from "../apiClient";

export class memberApi extends ApiClient {
  private static instance: memberApi;

  static getInstance(): memberApi {
    return this.instance || (this.instance = new this());
  }

  async postLogin(user: LoginType) {
    const response = await this._http.post<LoginResponseType>(
      `/member/login`,
      user
    );
    return response;
  }

  async postJoin(user: JoinType) {
    const response = await this._http.post("/member/join", user);
    return response;
  }

  async postPhoneCheck(phone: string) {
    const response = await this._http.post<boolean>("/member/phoneCheck", {
      phone,
    });
    return response;
  }

  async postPhoneMsg(phone: string) {
    const response = await this._http.post<null>("/member/message", { phone });
    return response;
  }

  async postCheckMsg(checkreq: CheckMsgReqType) {
    const response = await this._http.post<CheckMsgResType>(
      "/member/messageCheck",
      checkreq
    );
    return response;
  }

  async updateRegion(updatereq: UpdateRegionReqType) {
    const response = await this._http.put<null>(
      "/member/regionChange",
      updatereq
    );
    return response;
  }

  async getMemberInfo() {
    const response = await this._http.get<MemberInfoType>("/member");
    return response;
  }
}
