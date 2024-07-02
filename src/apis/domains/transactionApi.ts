import { ApiClient } from "../apiClient";

export class transacionApi extends ApiClient {
  private static instance: transacionApi;

  static getInstance(): transacionApi {
    return this.instance || (this.instance = new this());
  }

  async getTeamTransaction(teamId: number, date: string) {
    const response = await this._http.get<TeamTransactionType>(
      `/transaction/?teamId=${teamId}&date=${date}`
    );
    return response;
  }

  async postDue(teamId: number, due: DueType) {
    const response = await this._http.post(`/transaction/${teamId}`, due);
    return response;
  }

  async postExpense(teamId: number) {
    const response = await this._http.post<ExpenseType>(
      `/transaction/expense/${teamId}`
    );
    return response;
  }
}
