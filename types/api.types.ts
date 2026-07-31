export interface LoginApiErrorResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data:{
    accessToken: string;
    refreshToken: string;
  }
}


export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}