import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Randy DeRego | Systems Administrator",
  description: "Highly dedicated Systems Administrator with 10 years of experience specializing in managing critical environments, implementing robust automation, and reducing IT support overhead at scale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
