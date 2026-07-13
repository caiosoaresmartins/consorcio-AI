import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ConsórcioAI Platform",
  description: "Plataforma preditiva para contemplação em consórcios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
