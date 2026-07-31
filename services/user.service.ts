import { axiosInstance } from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";
import { IUser } from "@/types/user.type";

export async function getMyProfile() {
  const { data } = await axiosInstance.get<ApiResponse<IUser>>("/api/user/me");
  return data;
}