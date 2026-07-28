import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://devtest512.info"),
  title: {
    default: "Randy DeRego | Systems Administrator",
    template: "%s | Randy DeRego",
  },
  description:
    "Randy DeRego is a Systems Administrator with 10 years of experience specializing in managing critical environments, implementing robust automation, and reducing IT support overhead at scale. Based in Austin, TX.",
  keywords: [
    "Randy DeRego",
    "Randy DeRego Systems Administrator",
    "Randy DeRego Austin TX",
    "Randy DeRego IT professional",
    "Randy DeRego DevTest512",
    "Randy DeRego portfolio",
    "Randy DeRego blog",
    "Randy DeRego GitHub",
    "Randy DeRego LinkedIn",
    "Systems Administrator Austin Texas",
    "VMware ESXi administrator",
    "PowerShell automation",
    "Azure AWS cloud administration",
    "Active Directory Group Policy",
    "IT infrastructure management",
  ],
  authors: [{ name: "Randy DeRego", url: "https://devtest512.info" }],
  creator: "Randy DeRego",
  openGraph: {
    type: "website",
    url: "https://devtest512.info",
    siteName: "Randy DeRego",
    title: "Randy DeRego | Systems Administrator",
    description:
      "Randy DeRego is a Systems Administrator with 10 years of experience specializing in infrastructure management, automation, and IT operations. Based in Austin, TX.",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Randy DeRego | Systems Administrator",
    description:
      "Systems Administrator with 10 years of experience in infrastructure, automation, and cloud operations. Based in Austin, TX.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
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
