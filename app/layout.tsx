"use client"
import Head from "next/head";

import { api } from "@/utils/api";

import "@/styles/globals.css";

function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
    <Head>
        <title>LearnHq</title>
        <meta name="description" content="LearnHQ is a comprehensive learning management system that provides quality education and resources to students, teachers, and parents." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="twitter:site" content="@ruto_collins_" />
        <meta name="twitter:title" content="LearnHq" />
        <meta name="twitter:description" content="LearnHQ is a comprehensive learning management system that provides quality education and resources to students, teachers, and parents." />
      </Head>
      <body>{children}</body>
    </html>
  );
}

export default api.withTRPC(RootLayout);
