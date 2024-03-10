import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marius - Gigs",
  description: "A list of all the gigs I've attended",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-zinc-900">{children}</body>
    </html>
  );
}
