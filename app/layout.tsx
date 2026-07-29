import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://devtest512.info";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
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
  authors: [{ name: "Randy DeRego", url: BASE_URL }],
  creator: "Randy DeRego",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
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

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Randy DeRego",
  url: BASE_URL,
  jobTitle: "Systems Administrator",
  description:
    "Systems Administrator with 10 years of experience in infrastructure management, automation, and IT operations. Based in Austin, TX.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Austin",
    addressRegion: "TX",
    addressCountry: "US",
  },
  sameAs: [
    "https://github.com/killo431",
    "https://www.linkedin.com/in/randy-derego",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Randy DeRego",
  url: BASE_URL,
  description:
    "Randy DeRego is a Systems Administrator with 10 years of experience specializing in infrastructure management, automation, and IT operations.",
  author: {
    "@type": "Person",
    name: "Randy DeRego",
    url: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
