"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styled from "@emotion/styled";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <>
          <Header>
            <Title>ICE INTEL</Title>
          </Header>
          {children}
        </>
      </body>
    </html>
  );
}

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4281a4;
  padding: 20px 0;
  width: 100%;
`;

const Title = styled.h1`
  color: white;
`;
