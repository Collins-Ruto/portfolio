// "use client";

import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { ClientProvider } from "@/utils/trpc-provider";
import { LayoutProvider } from "./LayoutProvider";
import GoogleAnalytics from "~/components/GoogleAnalytics";

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
    default: "LearnHq School & Learning System",
    template: `%s | LearnHq LMS`,
  },
  metadataBase: new URL("https://learnhq.vercel.app"),
  description:
    "LearnHQ is a comprehensive learning management system that provides quality education and resources to students, teachers, and parents.",
  keywords: [
    "learnhq",
    "learn",
    "learnhq africa",
    "education",
    "learning management system",
    "lms",
    "africa education",
    "study",
    "online learning",
  ],
  alternates: {
    canonical: "/",
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
      type: "image/png",
      sizes: "32x32",
      url: "https://github.com/Collins-Ruto/learnhq/blob/main/assets/favicon-32x32.png?raw=true",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "https://github.com/Collins-Ruto/learnhq/blob/main/assets/favicon-16x16.png?raw=true",
    },
    {
      rel: "apple",
      sizes: "180x180",
      url: "https://github.com/Collins-Ruto/learnhq/blob/main/assets/apple-touch-icon.png?raw=true",
    },
  ],
  themeColor: "#ffffff",
  manifest: "https://learnhq.vercel.app/site.webmanifest",
  openGraph: {
    type: "website",
    title: "LearnHq School & Learning System",
    siteName: "LearnHq School & Learning System",
    url: "https://learnhq.vercel.app",
    description:
      "LearnHQ is a comprehensive learning management system that provides quality education and resources to students, teachers, and parents.",
    images: [
      {
        url: "https://learnhq.vercel.app/learnhq-cover.jpg",
      },
    ],
  },
  twitter: {
    title: "LearnHq School & Learning System",
    description:
      "LearnHQ is a comprehensive learning management system that provides quality education and resources to students, teachers, and parents.",
    card: "summary_large_image",
    site: "@learnhqafrica",
    creator: "@ruto_collins_",
    images: "https://learnhq.vercel.app/learnhq-cover.jpg",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};
