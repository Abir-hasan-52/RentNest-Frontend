 
"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { loginUser } from "@/services/auth/auth.api";
import { LoginApiErrorResponse } from "@/types/api.types";


export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,

    onSuccess: (data) => {
      toast.success(data.message);
      console.log(data);
    },

    onError: (error: AxiosError<LoginApiErrorResponse>) => {
      toast.error(
        error.response?.data?.message || "Something went wrong!"
      );
    },
  });
};