// ===========================
// Session API Types (Minimal - Chỉ field cần thiết)
// ===========================

/**
 * Message trong một conversation
 * 
 * Ví dụ:
 * - User message: { author: "user", content: { text: "Xin chào" }, timestamp: 1234567890 }
 * - AI response: { author: "model", content: { text: "Chào bạn!" }, timestamp: 1234567891 }
 */
export interface Message {
  id?: string;
  author: string; // "user" hoặc "model"
  content: {
    text?: string;
    [key: string]: any; // Cho phép mở rộng (images, files, etc.)
  };
  timestamp?: number; // Unix timestamp (ms)
  errorMessage?: string; // Nếu có lỗi
}
interface SessionState {
  title?: string;
  [key: string]: any;
}

/**
 * Session - Một cuộc trò chuyện (conversation)
 * 
 * Ví dụ use case:
 * - Hiển thị danh sách các cuộc trò chuyện trong sidebar
 * - Load lại cuộc trò chuyện cũ
 * - Xem lịch sử chat
 */
export interface Session {
  id: string; // ID duy nhất của session
  appName: string; // Tên app (vd: "chat-agent")
  userId: string; // ID của user
  events?: Message[]; // Danh sách messages trong conversation
  state: SessionState;
  createTime: number;
  updateTime: number;
}

/**
 * Chat - Alias cho Session (để tương thích với code cũ)
 */
export interface Chat {
  id: string;
  title?: string; 
  createdAt: number; 
  userId: string;
}
export type ChatMessage = {
  id: string;
  role: string;
  content: string;
};

/**
 * API Response Types
 */
export interface ListSessionsResponse {
  sessions: Session[];
}

export interface GetSessionResponse extends Session {}

export interface ListAppsResponse {
  apps: string[];
}

/**
 * API Error Response
 */
export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}

/**
 * API Request Parameters
 */
export interface ListSessionsParams {
  appName: string;
  userId: string;
}

export interface GetSessionParams {
  appName: string;
  userId: string;
  sessionId: string;
}

