import axios, { Axios, AxiosInstance, AxiosResponse } from "axios";
import { getCookie } from "../utils/cookie";

export class ApiClient {
  protected axiosInstance: AxiosInstance;
  protected axiosInstance2: AxiosInstance;

  _getResponseFromBody = <T>(
    response: AxiosResponse<BaseResponse<T>>
  ): BaseResponse<T> => {
    const { data: body } = response;

    return body;
  };

  protected _http = {
    get: <T = unknown>(...args: Parameters<Axios["get"]>) =>
      this.axiosInstance
        .get<BaseResponse<T>>(...args)
        .then(this._getResponseFromBody)
        .catch(this.handleError),
    post: <T = unknown>(...args: Parameters<Axios["post"]>) =>
      this.axiosInstance
        .post<BaseResponse<T>>(...args)
        .then(this._getResponseFromBody)
        .catch(this.handleError),
    put: <T = unknown>(...args: Parameters<Axios["put"]>) =>
      this.axiosInstance
        .put<BaseResponse<T>>(...args)
        .then(this._getResponseFromBody)
        .catch(this.handleError),
    delete: <T = unknown>(...args: Parameters<Axios["delete"]>) =>
      this.axiosInstance
        .delete<BaseResponse<T>>(...args)
        .then(this._getResponseFromBody)
        .catch(this.handleError),
  };

  protected _http2 = {
    get: <T = unknown>(...args: Parameters<Axios["get"]>) =>
      this.axiosInstance2
        .get<BaseResponse<T>>(...args)
        .then(this._getResponseFromBody)
        .catch(this.handleError),
    post: <T = unknown>(...args: Parameters<Axios["post"]>) =>
      this.axiosInstance2
        .post<BaseResponse<T>>(...args)
        .then(this._getResponseFromBody)
        .catch(this.handleError),
    put: <T = unknown>(...args: Parameters<Axios["put"]>) =>
      this.axiosInstance2
        .put<BaseResponse<T>>(...args)
        .then(this._getResponseFromBody)
        .catch(this.handleError),
    delete: <T = unknown>(...args: Parameters<Axios["delete"]>) =>
      this.axiosInstance2
        .delete<BaseResponse<T>>(...args)
        .then(this._getResponseFromBody)
        .catch(this.handleError),
  };

  constructor() {
    this.axiosInstance = this.createAxiosInstance(true);
    this.axiosInstance2 = this.createAxiosInstance(false);
  }

  private createAxiosInstance = (type: boolean) => {
    const headers: any = {
      "content-type": type ? "application/json" : "multipart/form-data",
    };

    const newInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: 100000,
      headers,
    });

    newInstance.interceptors.request.use(
      (config) => {
        const TOKEN = getCookie("token");
        if (TOKEN) {
          config.headers["Authorization"] = `Bearer ${TOKEN}`;
        }

        config.headers["Content-Type"] = type
          ? "application/json"
          : "multipart/form-data";
        return config;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );

    newInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        // 기본 응답 형태로 오류 처리
        if (error.response && error.response.data) {
          const customError = {
            success: false,
            type: "",
            data: null,
            message: error.response.data.message || error.message,
          } as BaseResponse<null>;
          return Promise.reject(customError);
        }
        return Promise.reject({
          data: null,
          message: error.message,
        } as BaseResponse<null>);
      }
    );

    return newInstance;
  };

  private handleError = (error: BaseResponse<null>) => {
    console.error("API call failed:", error);
    return Promise.reject(error);
  };
}
