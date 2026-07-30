"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, House, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useActionState, useEffect, useState } from "react"
import { toast } from "sonner"
import { loginAction } from "../_actions/auth.action"

const LoginForm = () => {

    const [state, action, pending] = useActionState(loginAction, null)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message || "Login Successful");
            router.push("/dashboard/admin");
        } else if (!state.errors) {
            toast.error(state.message || "Login failed");
        }
    }, [state, router]);

    return (
        <div className="w-full">
            {/* Mobile-only branding, since AuthHero is hidden below lg */}
            <div className="mb-8 flex flex-col items-center gap-3 lg:hidden">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                    <House size={28} />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                    Welcome to <span className="text-primary">RentNest</span>
                </h1>
            </div>

            <Card className="border-border p-6 shadow-xl shadow-black/5 sm:p-8">
                <div className="mb-6 space-y-1.5">
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                        Log in
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Enter your credentials to access your account
                    </p>
                </div>

                <form action={action} className="space-y-5" noValidate>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            aria-invalid={!!state?.errors?.email}
                        />
                        {state?.errors?.email && (
                            <p className="text-sm text-destructive">
                                {state.errors.email[0]}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                aria-invalid={!!state?.errors?.password}
                                className="pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                tabIndex={-1}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {state?.errors?.password && (
                            <p className="text-sm text-destructive">
                                {state.errors.password[0]}
                            </p>
                        )}
                    </div>

                    <Button type="submit" disabled={pending} className="w-full">
                        {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {pending ? "Logging in..." : "Login"}
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </Card>
        </div>
    )
}

export default LoginForm