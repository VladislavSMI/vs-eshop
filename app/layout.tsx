import { inter } from "@/styles/fonts";
import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "VS skateboard shop",
  description: "E-shop for skateboards, wheels, trucks, and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="business">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
