
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry'; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MedAssist - Chẩn đoán Võng mạc AI",
  description: "Hệ thống y tế số 4.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </body>
    </html>
  );
}
