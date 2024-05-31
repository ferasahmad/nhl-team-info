"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styled from "@emotion/styled";
import Image from "next/image";

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
            <Image src="/images/hockey.png" width={50} height={50} alt="" />
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
  font-size: 50px;
  margin-left: 10px;
`;
