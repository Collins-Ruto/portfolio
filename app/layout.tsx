import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { ClientProvider } from "@/utils/trpc-provider";
import { LayoutProvider } from "./LayoutProvider";
import GoogleAnalytics from "~/components/GoogleAnalytics";
import '~/styles/animations.css'

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      <html lang="en">
        <body>
          {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
            <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
          ) : null}
          <LayoutProvider>{children}</LayoutProvider>
          <Analytics />
        </body>
      </html>
    </ClientProvider>
  );
}

export const metadata: Metadata = {
  title: {
    default: "Collins Ruto | Software developer",
    template: `%s | Collins Ruto`,
  },
  metadataBase: new URL("https://collinsruto.vercel.app"),
  description:
    "I am a hobbyist software developer with expertise in fullstack web development. I create web apps to solve your business problems.",
  keywords: [
    "Collins Ruto",
    "collins cv",
    "software engineer",
    "software developer",
    "web developer",
    "web3 developer",
    "python developer",
    "backend developer",
    "nodejs",
    "javascript",
    "near certified",
    "front end developer",
    "solidity",
    "rust",
    "code",
    "programming"
  ],
  alternates: {
    canonical: "https://collinsruto.netlify.app",
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
  authors: [
    {
      name: "Collins Ruto",
      url: "https://collinsruto.netlify.app",
    },
  ],
  icons: [
    {
      rel: "icon",
      type: "image/x-icon",
      sizes: "any",
      url: "/favicon.ico",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "apple",
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
  ],
  themeColor: "#ffffff",
  manifest: "/site.webmanifest",
  twitter: {
    creator: "@ruto_collins_",
    title: "Collins Ruto | Full-Stack Web Developer",
    description:
      "I am a Hobbyist Software designer & developer, software developer and software engineering Currently studying Marine Engineering at The Technical University of Mombasa.",
    card: "summary_large_image",
    site: "@ruto_collins_",
    images:
      "https://raw.githubusercontent.com/Collins-Ruto/collins-ruto.github.io/main/img/collinsruto-cover.png",
  },
  openGraph: {
    title: "Collins Ruto | Full-stack Web developer",
    siteName: "Collins Ruto | Full-stack web developer",
    description:
      "I am a hobbyist full-stack software developer with expertise in Web, Web3 and Android development. I create web apps to solve your business problems.",
    type: "website",
    url: "https://collinsruto.vercel.app",
    images:
      "https://raw.githubusercontent.com/Collins-Ruto/collins-ruto.github.io/main/img/collinsruto-cover.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {},
};

