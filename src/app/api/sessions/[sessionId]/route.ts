import { NextRequest, NextResponse } from "next/server";
import { Session } from "@/lib/types";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

/**
 * GET /api/sessions/[sessionId]
 * Query params: appName, userId
 * Path param: sessionId
 * 
 * Gets a specific session by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;
    const { searchParams } = new URL(request.url);
    const appName = searchParams.get("appName");
    const userId = searchParams.get("userId");

    // Validate required parameters
    if (!appName || !userId) {
      return NextResponse.json(
        {
          error: "Missing parameters",
          message: "Both appName and userId are required",
        },
        { status: 400 }
      );
    }

    if (!sessionId) {
      return NextResponse.json(
        {
          error: "Missing parameter",
          message: "sessionId is required",
        },
        { status: 400 }
      );
    }

    // Get authorization token from request headers
    const authHeader = request.headers.get("authorization");

    // Call backend API - Correct endpoint: /apps/{app_name}/users/{user_id}/sessions/{session_id}
    const backendUrl = `${BACKEND_URL}/apps/${appName}/users/${userId}/sessions/${sessionId}`;
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
          message: errorData.detail || `Failed to fetch session: ${response.statusText}`,
        },
        { status: response.status }
      );
    }

    const session: Session = await response.json();

    return NextResponse.json(session, { status: 200 });
  } catch (error) {
    console.error("Error fetching session:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/sessions/[sessionId]
 * Query params: appName, userId
 * Path param: sessionId
 * 
 * Deletes a specific session by ID
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;
    const { searchParams } = new URL(request.url);
    const appName = searchParams.get("appName");
    const userId = searchParams.get("userId");

    // Validate required parameters
    if (!appName || !userId) {
      return NextResponse.json(
        {
          error: "Missing parameters",
          message: "Both appName and userId are required",
        },
        { status: 400 }
      );
    }

    if (!sessionId) {
      return NextResponse.json(
        {
          error: "Missing parameter",
          message: "sessionId is required",
        },
        { status: 400 }
      );
    }

    // Get authorization token from request headers
    const authHeader = request.headers.get("authorization");

    // Call backend API
    const backendUrl = `${BACKEND_URL}/apps/${appName}/users/${userId}/sessions/${sessionId}`;
    const response = await fetch(backendUrl, {
      method: "DELETE",
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
          message: errorData.detail || `Failed to delete session: ${response.statusText}`,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { success: true, message: "Session deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting session:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

