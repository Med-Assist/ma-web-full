import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "MedAssist - Chẩn đoán võng mạc AI",
  description: "Hệ thống y tế số cho chẩn đoán, lịch hẹn và quản lý hồ sơ bệnh nhân.",
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
      <body className="antialiased">
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
