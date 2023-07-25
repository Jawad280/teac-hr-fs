import AuthProvider from "@/components/AuthProvider";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

import { Inter } from "next/font/google";

const font = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TeacHR",
  description: "Teacher Admin and Student Management",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={font.className}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
