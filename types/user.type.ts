export type Role = "ADMIN" | "LANDLORD" | "TENANT";

export type UserStatus = "ACTIVE" | "BANNED";

export interface IUser {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    profileImage: string | null;
    address: string | null;
    role: Role;
    status: UserStatus;
    createdAt: string;
    updatedAt: string;
  };
}
