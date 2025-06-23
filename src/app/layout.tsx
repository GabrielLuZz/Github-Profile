import type { Metadata } from "next";
import "./globals.css";

import { Roboto } from "next/font/google";
import { Providers } from "./providers";
import { getInitialData } from "./getInitialData";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Buscar dados iniciais no servidor
  const initialData = await getInitialData();

  return (
    <html lang="pt-BR">
      <body className={`${roboto.variable} antialiased`}>
        <Providers dehydratedState={initialData}>{children}</Providers>
      </body>
    </html>
  );
}
