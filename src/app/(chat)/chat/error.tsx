'use client'; // BẮT BUỘC cho error boundary

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/lable";
import Image from "next/image";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error("App error:", error);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-[var(--color4)] bg-[var(--color1)]">
      {/* Background image */}
      <Image
        src="/error_chan.jpeg"
        alt="Error background"
        fill
        className="object-cover opacity-10 pointer-events-none"
      />

      {/* Main content */}
      <div className="z-10 text-center">
        <div className="text-[8rem] font-bold mb-6">500</div>
        <Label>Whoops, có lỗi xảy ra rồi 😢</Label>

        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          {error?.message || "Đã có sự cố trong quá trình tải trang. Hãy thử lại hoặc quay về trang chủ."}
        </p>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => reset()}
          >
            Thử lại
          </Button>

          <Link
            href="/"
            className="px-5 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
