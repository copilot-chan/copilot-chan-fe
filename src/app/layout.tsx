import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Copilot-chan",
  description: "AI assistant for learning, work, and creativity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
