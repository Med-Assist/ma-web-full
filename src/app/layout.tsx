import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "MedAssist - Chan doan vong mac AI",
  description: "He thong y te so cho chan doan, lich hen va quan ly ho so benh nhan.",
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
