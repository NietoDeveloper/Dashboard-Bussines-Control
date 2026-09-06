import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { business } from "@/config/business";

export const metadata: Metadata = {
  title: business.name,
  description: business.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="h-full w-full">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
