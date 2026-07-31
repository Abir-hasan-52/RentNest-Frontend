import { useQuery } from "@tanstack/react-query";

import { getMyProfile } from "@/services/user.service";

export function useMyProfile() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMyProfile,
  });
}