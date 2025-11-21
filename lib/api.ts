import { AppError } from "./error";

export const fetcher = async (url: string, token?: string) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, { headers });

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

  return res.json();
};
