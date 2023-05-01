"use client";

import Head from "next/head";
import { api } from "@/utils/api";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import { Header } from "components";
import { Analytics } from "@vercel/analytics/react";
import { usePathname } from "next/navigation";

function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  const currentRoute = usePathname();

  return (
    <html lang="en">
      <Head>
        <title>LearnHq</title>
        <meta
          name="description"
          content="LearnHQ is a comprehensive learning management system that provides quality education and resources to students, teachers, and parents."
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
        <SessionProvider>
          {currentRoute !== "/" && currentRoute !== "/login" ? (
            <div>
              <Header />
              <div className="flex pb-10 md:ml-60">
                <div className="grow">{children}</div>
              </div>
            </div>
          ) : (
            <div className="">
              <div className="flex">
                <div className="grow">{children}</div>
              </div>
            </div>
          )}
        </SessionProvider>

        <Analytics />
      </body>
    </html>
  );
}

export default api.withTRPC(RootLayout);
