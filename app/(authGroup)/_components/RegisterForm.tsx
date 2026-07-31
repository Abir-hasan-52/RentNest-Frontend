"use client";

import Link from "next/link";
import { Eye, EyeOff, House, Lock, Mail, User, Loader2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { registerAction, ActionState } from "../_actions/register.action";

const initialState: ActionState = { success: false, message: "" };

export default function RegisterForm() {
  const [state, action, pending] = useActionState(registerAction, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!state.message) return;

    if (!state.success && !state.errors) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="w-full">
      {/* Mobile-only branding, since AuthHero is hidden below lg */}
      <div className="mb-8 flex flex-col items-center gap-3 lg:hidden">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
          <House size={28} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Join <span className="text-primary">RentNest</span>
        </h1>
      </div>

      <Card className="rounded-3xl border border-border/60 bg-card/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <div className="mb-8 space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Create account</h2>
          <p className="text-muted-foreground">
            Create your RentNest account to get started.
          </p>
        </div>

        <form action={action} className="space-y-5" noValidate>
          {/* Name */}
          <div>
            <div className="relative">
              <User className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="name"
                type="text"
                placeholder="Enter your full name"
                className="h-12 rounded-xl pl-12"
                aria-invalid={!!state.errors?.name}
              />
            </div>
            {state.errors?.name && (
              <p className="mt-1.5 pl-1 text-sm text-destructive">
                {state.errors.name[0]}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <div className="relative">
              <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="h-12 rounded-xl pl-12"
                aria-invalid={!!state.errors?.email}
              />
            </div>
            {state.errors?.email && (
              <p className="mt-1.5 pl-1 text-sm text-destructive">
                {state.errors.email[0]}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="h-12 rounded-xl pr-12 pl-12"
                aria-invalid={!!state.errors?.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {state.errors?.password && (
              <p className="mt-1.5 pl-1 text-sm text-destructive">
                {state.errors.password[0]}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <div className="relative">
              <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="h-12 rounded-xl pr-12 pl-12"
                aria-invalid={!!state.errors?.confirmPassword}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {state.errors?.confirmPassword && (
              <p className="mt-1.5 pl-1 text-sm text-destructive">
                {state.errors.confirmPassword[0]}
              </p>
            )}
          </div>

          {/* Register Button */}
          <Button
            type="submit"
            disabled={pending}
            className="h-12 w-full rounded-xl text-base font-semibold"
          >
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {pending ? "Creating account..." : "Create Account"}
          </Button>

          {/* Login Link */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Login
            </Link>
          </p>

          {/* Footer */}
          <p className="pt-2 text-center text-xs leading-5 text-muted-foreground">
            By creating an account, you agree to our{" "}
            <span className="font-medium text-foreground">Terms of Service</span> and{" "}
            <span className="font-medium text-foreground">Privacy Policy</span>.
          </p>
        </form>
      </Card>
    </div>
  );
}