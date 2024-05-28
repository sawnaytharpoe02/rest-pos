import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Forklore",
  description: "Food ordering app for resturants including admin panel and QR code scanning for customers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <div>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
