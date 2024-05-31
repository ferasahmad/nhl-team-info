import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import Header from "../../components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ice Intel",
  description:
    "Stay updated with comprehensive statistics and insights on all NHL teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <>{children}</>
      </body>
    </html>
  );
}
