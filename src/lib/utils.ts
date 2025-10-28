import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ChatSDKError, type ErrorCode } from './errors';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const { code, cause } = await response.json();
    throw new ChatSDKError(code as ErrorCode, cause);
  }

  return response.json();
};

export function generateTimeUID() {
  // Lấy thời gian hiện tại (milliseconds)
  const timestamp = Date.now().toString(36); // chuyển sang base36 để ngắn hơn
  
  // Sinh phần ngẫu nhiên tránh trùng lặp nếu gọi nhiều trong cùng 1 ms
  const randomPart = Math.random().toString(36).substring(2, 8);
  
  // Ghép lại thành UID
  return `${timestamp}-${randomPart}`;
}
