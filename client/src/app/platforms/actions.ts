"use server";

import { APIErrorResponse, APISuccessResponse } from "@/types/api-response";
import { Platform } from "@/types/platform";

const baseUrl = process.env.API_BASE_URL!;

export async function getPlatformsAction(
  category?: string
): Promise<APISuccessResponse<Platform[]> | APIErrorResponse> {
  const params = new URLSearchParams();

  if (category) params.append("category", category.toString());

  try {
    const res = await fetch(`${baseUrl}/platforms?${params.toString()}`, {
      method: "GET",
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

    const result: APISuccessResponse<Platform[]> = await res.json();

    return result;
  } catch {
    return {
      success: false,
      status: 503,
      message: "An unexpected error occurred.",
    };
  }
}
