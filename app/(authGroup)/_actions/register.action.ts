"use server";

import { redirect } from "next/navigation";
import { registerSchema } from "../_schemas/register.schema";


export interface ActionState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

const API_URL = process.env.BACKEND_API_URL;

export async function registerAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Form Data
  const values = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  // Zod Validation
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const res = await fetch(`${API_URL}/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Registration failed.",
      };
    }
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }

  redirect("/login");
}