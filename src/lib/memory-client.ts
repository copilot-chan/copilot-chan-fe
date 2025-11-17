import { ChatSDKError, ErrorCode } from "./errors";

export interface Memory {
  id: string;
  memory: string; // 'memory' trong API gốc
  metadata?: any;
  categories?: string[];
  created_at: string;
  updated_at?: string;
  expiration_date?: string | null;
  structured_attributes?: Record<string, any>;
  [key: string]: any;
}

export interface MemoriesResponse {
  results: Memory[];
  count: number;
  page: number;
  page_size: number;
  has_more?: boolean;
}

export interface GetMemoriesParams {
  page?: number;
  pageSize?: number;
  authorization: string;
}

export interface DeleteMemoryParams {
  memoryId: string;
  authorization: string;
}

export interface ErrorResponse {
  code: string;
  message: string;
  cause?: string;
}

export const authFetcher = async ([url, token]: [string, string]) => {
  const response = await fetch(url, {
    headers: {
      'Authorization':  `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const { code, cause } = await response.json();
    throw new ChatSDKError(code as ErrorCode, cause);
  }

  return response.json();
};


// --- MemoryClient ---
export class MemoryClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  async getAllMemories(params: GetMemoriesParams): Promise<MemoriesResponse> {
    const { page = 1, pageSize = 100, authorization } = params;

    const response = await fetch(
      `${this.baseUrl}/memory/all?page=${page}&page_size=${pageSize}`,
      {
        method: 'GET',
        headers: {
          'Authorization': authorization,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message || 'Failed to fetch memories');
    }

    return response.json();
  }

  async deleteMemory(params: DeleteMemoryParams): Promise<{ success: boolean }> {
    const { memoryId, authorization } = params;

    const response = await fetch(
      `${this.baseUrl}/memory/${memoryId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': authorization,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message || 'Failed to delete memory');
    }

    return { success: true };
  }
}

// --- Singleton instance ---
export const memoryClient = new MemoryClient();