import { NextRequest, NextResponse } from "next/server";
import { Session } from "@/lib/types";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

/**
 * GET /api/sesisons/list
 * Query params: appName, userId
 * 
 * Lists all sessions for a specific app and user
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const appName = searchParams.get("appName");
    const userId = searchParams.get("userId");

    // Validate required parameters
    if (!appName || !userId) {
      return NextResponse.json(
        { 
          error: "Missing parameters",
          message: "Both appName and userId are required" 
        },
        { status: 400 }
      );
    }

    // Get authorization token from request headers
    const authHeader = request.headers.get("authorization");

    const backendUrl = `${BACKEND_URL}/apps/${appName}/users/${userId}/sessions`;
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
          message: errorData.detail || `Failed to fetch sessions: ${response.statusText}`,
        },
        { status: response.status }
      );
    }

    const sessions: Session[] = await response.json();
    
    return NextResponse.json({ sessions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

