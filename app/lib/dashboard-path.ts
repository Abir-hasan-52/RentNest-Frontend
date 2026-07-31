import { Role } from "@/types/user.type";

export const getDashboardPath = (role: Role) => {
  switch (role) {
    case "ADMIN":
      return "/dashboard/admin";

    case "LANDLORD":
      return "/dashboard/landlord";

    case "TENANT":
      return "/dashboard/tenant";

    default:
      return "/";
  }
};