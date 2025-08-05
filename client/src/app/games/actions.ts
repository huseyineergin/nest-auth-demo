"use server";

import { APIErrorResponse, APISuccessResponse } from "@/types/api-response";
import { Game } from "@/types/game";

const baseUrl = process.env.API_BASE_URL!;

export async function createGameAction(formData: {
  name: string;
  description: string;
  releaseDate: string;
  metascore: string;
  userScore: string;
  developer: string;
  publisher: string;
  genreIds: string[];
  platformIds: string[];
}): Promise<APISuccessResponse<Game> | APIErrorResponse> {
  try {
    const res = await fetch(`${baseUrl}/games`, {
      method: "POST",
      body: JSON.stringify(formData),
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

    const result: APISuccessResponse<Game> = await res.json();

    return result;
  } catch {
    return {
      success: false,
      status: 503,
      message: "An unexpected error occurred.",
    };
  }
}
