"use client";

import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

 
import { useLogin } from "@/hooks/auth/useLogin";

import { loginSchema, LoginFormData } from "../_schemas/login.schema";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
 

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <Card className="rounded-3xl border border-border/60 bg-card/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <div className="mb-8 space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Welcome Back 👋</h2>

        <p className="text-muted-foreground">
          Sign in to continue to your RentNest account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="email"
              placeholder="Enter your email"
              className="h-12 rounded-xl pl-12"
              {...register("email")}
            />
          </div>

          {errors.email && (
            <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="h-12 rounded-xl pl-12 pr-12"
              {...register("password")}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-2 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me */}
        <label className="flex items-center gap-3 text-sm text-muted-foreground">
          <input type="checkbox" className="h-4 w-4 rounded accent-primary" />

          <span>Remember me</span>
        </label>

        {/* Login */}
        <Button
          type="submit"
          disabled={isPending}
          className="h-12 w-full rounded-xl text-base font-semibold"
        >
          {isPending ? "Signing In..." : "Login"}
        </Button>

        {/* Register */}
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary hover:underline"
          >
            Create Account
          </Link>
        </p>

        {/* Footer */}
        <p className="pt-2 text-center text-xs leading-5 text-muted-foreground">
          By signing in, you agree to our{" "}
          <span className="font-medium text-foreground">Terms of Service</span>{" "}
          and{" "}
          <span className="font-medium text-foreground">Privacy Policy</span>.
        </p>
      </form>
    </Card>
  );
}
