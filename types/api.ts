// ===========================
// Chat API Types (Clean & Minimal)
// ===========================

/**
 * Message trong một conversation
 */
export interface Message {
  id?: string;
  author: string; // "user" hoặc "model"
  content: {
    text?: string;
    parts?: any[]; // Cho phép cấu trúc phức tạp từ backend (files, function calls)
    [key: string]: any; 
  };
  timestamp?: number; // Unix timestamp (ms)
  errorMessage?: string;
}

interface ChatState {
  title?: string;
  [key: string]: any;
}

/**
 * Session - Một cuộc trò chuyện (conversation)
 */
export interface Session {
  id: string;
  appName: string;
  userId: string;
  events?: Message[]; // Danh sách messages
  state: ChatState;
  createTime: number;
  updateTime: number;
}

/**
 * Chat - Alias cho Session (để tương thích ngược nếu cần)
 */
export type Chat = Session;

/**
 * API Response Types
 */
export interface ListChatsResponse {
  sessions: Session[];
}

export interface GetChatResponse extends Session {}

/**
 * API Error Response
 */
export interface ApiErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}


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
