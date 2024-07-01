interface BaseResponse<T> {
  success: boolean;
  type: string;
  data?: T;
  message?: string;
}
