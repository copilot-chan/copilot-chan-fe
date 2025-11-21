import { NextResponse } from "next/server";

/**
 * Custom Error class cho ứng dụng
 */
export class AppError extends Error {
  public statusCode: number;
  public code: string;
  public payload?: any;

  constructor(message: string, statusCode: number = 500, code: string = "INTERNAL_ERROR", payload?: any) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.payload = payload;
  }
}

/**
 * Helper để handle API error và trả về NextResponse chuẩn
 */
export function handleApiError(error: unknown) {
  console.error("API Error:", error);

  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: error.code,
        message: error.message,
        statusCode: error.statusCode,
        payload: error.payload,
      },
      { status: error.statusCode }
    );
  }

  if (error instanceof Error) {
    return NextResponse.json(
      {
        error: "INTERNAL_ERROR",
        message: error.message,
        statusCode: 500,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      error: "UNKNOWN_ERROR",
      message: "An unknown error occurred",
      statusCode: 500,
    },
    { status: 500 }
  );
}

/**
 * Helper để ném lỗi AppError từ fetch response
 */
export async function checkFetchError(res: Response) {
  if (!res.ok) {
    let errorMessage = res.statusText;
    let errorCode = "API_ERROR";
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
      errorCode = errorData.code || errorCode;
    } catch (e) {
      // Ignore json parse error
    }
    throw new AppError(errorMessage, res.status, errorCode);
  }
  return res;
}
