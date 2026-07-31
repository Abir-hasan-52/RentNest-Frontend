export type Role = "TENANT" | "LANDLORD" | "ADMIN";
export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export interface UserData {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  profileImage: string | null;
  address: string | null;
  role: Role;
  status: UserStatus;
  createdAt: string;  
  updatedAt: string;
}

export interface IUser {
  success: boolean;
  statusCode: number;
  message: string;
  data: UserData;
}