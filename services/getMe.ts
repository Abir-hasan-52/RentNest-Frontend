"use server";

import { cookies } from "next/headers";

export const getMe = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    // throw new Error("User is not Logged in!");
    return{
        success: false,
        statusCode: 401,
        message: "User is not Logged in!",
    }
  }
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/user/me`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache", 
    next:{
        revalidate: 60*60 *24,
        tags: ["my-profile"]
    }
  });
  const result = await res.json();
//   console.log(result);
  return result;
};
