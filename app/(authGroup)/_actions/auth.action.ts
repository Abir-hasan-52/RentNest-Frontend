"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { loginSchema } from "../_schemas/login.schema";

type LoginState = {
    success: boolean,
    statusCode: number,
    message: string,
    data?: {
        accessToken: string,
        refreshToken: string
    },
    errors?: {
        email?: string[],
        password?: string[],
    }
} | null

export const loginAction = async (prevState: LoginState, formData: FormData): Promise<LoginState> => {

    const raw = {
        email: formData.get("email")?.toString().trim() ?? "",
        password: formData.get("password")?.toString() ?? "",
    }

    //  validation
    const parsed = loginSchema.safeParse(raw)

    if (!parsed.success) {
        return {
            success: false,
            statusCode: 400,
            message: "Please fix the errors below",
            errors: parsed.error.flatten().fieldErrors,
        }
    }

    const payload = parsed.data

    let res: Response;
    try {
        res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
    } catch (error) {
        console.error("Login request failed:", error);
        return { success: false, statusCode: 500, message: "Could not connect to server. Please try again." };
    }

    let result: LoginState;
    try {
        result = await res.json();
    } catch (error) {
        console.error("Failed to parse login response:", error);
        return { success: false, statusCode: res.status, message: "Unexpected response from server" };
    }

    if (result?.success && result.data) {
        const cookieStore = await cookies();

        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
        });

        cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
        });

        redirect("/dashboard/admin");
    }

    return result;
}