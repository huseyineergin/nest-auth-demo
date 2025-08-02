export type APISuccessResponse<T> = {
  success: boolean;
  message: string;
  status: number;
  data: T;
};

export type APIErrorResponse = {
  success: boolean;
  message: string;
  status: number;
};
