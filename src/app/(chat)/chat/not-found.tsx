// app/chat/not-found.tsx
export default function ChatNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2 className="text-3xl font-semibold mb-2">Phiên chat không tồn tại 😢</h2>
      <p className="text-gray-500 mb-4">
        Có thể ID không hợp lệ hoặc bạn không có quyền truy cập.
      </p>
      <a
        href="/"
        className="text-blue-600 hover:underline"
      >
        Quay lại danh sách chat
      </a>
    </div>
  );
}
