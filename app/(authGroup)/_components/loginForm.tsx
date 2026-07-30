"use client";

import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card className="rounded-3xl border bg-card/90 p-8 shadow-2xl backdrop-blur-xl">
      <div className="mb-8 space-y-2 text-center">
        <h2 className="text-3xl font-bold">Welcome Back 👋</h2>

        <p className="text-sm text-muted-foreground">
          Sign in to continue to your account.
        </p>
      </div>

      <form className="space-y-5">
        <div className="relative">
          <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

          <Input
            className="h-12 rounded-xl pl-12"
            placeholder="Enter your email"
            type="email"
          />
        </div>

        <div className="relative">
          <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

          <Input
            className="h-12 rounded-xl pl-12 pr-12"
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="font-medium text-primary hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button className="h-12 w-full rounded-xl text-base font-semibold">
          Login
        </Button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              OR CONTINUE WITH
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-12 w-full rounded-xl"
        >
          Continue with Google
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </Card>
  );
}