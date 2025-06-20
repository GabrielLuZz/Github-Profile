import type { Metadata } from "next";
import "./globals.css";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Github profile",
  description: "Um projeto feito inspirado na parte de profile do github",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${roboto.variable} antialiased`}>{children}</body>
    </html>
  );
}
