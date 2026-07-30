// "use client";

// import { useMutation } from "@tanstack/react-query";
// import { loginUser } from "@/services/auth/auth.api";

// export const useLogin = () => {
//   return useMutation({
//     mutationKey: ["login"],
//     mutationFn: loginUser,
//   });
// };


"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { loginUser } from "@/services/auth/auth.api";
import { ApiErrorResponse } from "@/types/api.types";
// import { ApiErrorResponse } from "@/types/api.types";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,

    onSuccess: (data) => {
      toast.success(data.message);
      console.log(data);
    },

    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(
        error.response?.data?.message || "Something went wrong!"
      );
    },
  });
};