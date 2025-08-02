"use server";

import { APIErrorResponse, APISuccessResponse } from "@/types/api-response";
import { cookies } from "next/headers";

const baseUrl = process.env.API_BASE_URL!;

export async function signInAction(formData: {
  username: string;
  password: string;
}): Promise<APISuccessResponse<{ accessToken: string }> | APIErrorResponse> {
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${baseUrl}/auth/sign-in`, {
      method: "POST",
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      try {
        const error: APIErrorResponse = await res.json();
        return error;
      } catch {
        return {
          success: false,
          status: res.status,
          message: "An unexpected error occurred.",
        };
      }
    }

    const result: APISuccessResponse<{ accessToken: string }> = await res.json();

    cookieStore.set("accessToken", result.data.accessToken, {
      path: "/",
      maxAge: 60 * 15,
      sameSite: "strict",
    });

    return result;
  } catch {
    return {
      success: false,
      status: 503,
      message: "An unexpected error occurred.",
    };
  }
}

export async function signUpAction(formData: {
  username: string;
  password: string;
}): Promise<APISuccessResponse<{ accessToken: string }> | APIErrorResponse> {
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${baseUrl}/auth/sign-up`, {
      method: "POST",
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      try {
        const error: APIErrorResponse = await res.json();
        return error;
      } catch {
        return {
          success: false,
          status: res.status,
          message: "An unexpected error occurred.",
        };
      }
    }

    const result: APISuccessResponse<{ accessToken: string }> = await res.json();

    cookieStore.set("accessToken", result.data.accessToken, {
      path: "/",
      maxAge: 60 * 15,
      sameSite: "strict",
    });

    return result;
  } catch {
    return {
      success: false,
      status: 503,
      message: "An unexpected error occurred.",
    };
  }
}
