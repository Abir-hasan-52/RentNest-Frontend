type Role = "ADMIN" | "LANDLORD" | "TENANT";

type UserStatus = "ACTIVE" | "BANNED";

export default interface IUser {
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
