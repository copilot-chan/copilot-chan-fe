import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

/**
 * GET /api/apps
 * 
 * Lists all available apps
 */
export async function GET(request: NextRequest) {
  try {
    // Get authorization token from request headers
    const authHeader = request.headers.get("authorization");

    // Call backend API - Correct endpoint: /list-apps
    const backendUrl = `${BACKEND_URL}/list-apps`;
    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader && { Authorization: authHeader }),
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: "Backend error",
          message: errorData.detail || `Failed to fetch apps: ${response.statusText}`,
        },
        { status: response.status }
      );
    }

    const apps: string[] = await response.json();

    return NextResponse.json({ apps }, { status: 200 });
  } catch (error) {
    console.error("Error fetching apps:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
