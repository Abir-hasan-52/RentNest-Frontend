"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { updateProfileSchema } from "../_schemas/updateProfile.schema";

export interface ActionState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

const API_URL = process.env.BACKEND_API_URL;

export async function updateProfileAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const values = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    profileImage: formData.get("profileImage"),
  };

  const validatedFields = updateProfileSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Session expired. Please log in again.",
    };
  }

  try {
    const res = await fetch(`${API_URL}/api/user/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(validatedFields.data),
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to update profile.",
      };
    }

    revalidatePath("/dashboard/profile");

    return {
      success: true,
      message: "Profile updated successfully.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}