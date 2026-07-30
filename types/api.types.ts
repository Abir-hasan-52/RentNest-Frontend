export interface LoginApiErrorResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data:{
    accessToken: string;
    refreshToken: string;
  }
}