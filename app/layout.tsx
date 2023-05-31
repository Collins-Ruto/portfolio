// "use client";

import Head from "next/head";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
// import { Providers } from "../../temps/redux/provider";

import type { Metadata } from "next";
import { ClientProvider } from "@/utils/trpc-provider";
import { LayoutProvider } from "./LayoutProvider";

export const metadata: Metadata = {
  title: "LearnHq",
  description:
    "LearnHQ is a comprehensive learning management system that provides quality education and resources to students, teachers, and parents.",
};

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
        <Head>
          <title>LearnHq</title>
          <meta
            name="description"
            content="LearnHQ is a comprehensive learning management system that provides quality education and resources to students, teachers, and parents."
          />
          <meta
            data-react-helmet="true"
            name="keywords"
            content="learnhq, learnhq africa, education"
          />
          <link rel="icon" href="@assets/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="@assets/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="@assets/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="@assets/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest"></link>
          <meta name="twitter:site" content="@learnhqafrica" />
          <meta name="twitter:title" content="LearnHq" />
          <meta
            name="twitter:description"
            content="LearnHQ is a comprehensive learning management system that provides quality education and resources to students, teachers, and parents."
          />
        </Head>
        <body>
          {/* <Providers> */}
          <LayoutProvider>
            {children}
          </LayoutProvider>
          {/* </Providers> */}
          <Analytics />
        </body>
      </html>
    </ClientProvider>
  );
}
