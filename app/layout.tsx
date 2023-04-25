"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { Header } from "components";
import type { User } from "~/types/types";
import { DummyUser } from "~/types/types";
import { Analytics } from "@vercel/analytics/react";

function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>(DummyUser);
  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    const user: User =
      userFromLocalStorage !== null
        ? (JSON.parse(userFromLocalStorage) as User)
        : DummyUser;
    setUser(user);
  }, []);

  return (
    <html lang="en">
      <Head>
        <title>LearnHq</title>
        <meta
          name="description"
          content="LearnHQ is a comprehensive learning management system that provides quality education and resources to students, teachers, and parents."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="twitter:site" content="@ruto_collins_" />
        <meta name="twitter:title" content="LearnHq" />
        <meta
          name="twitter:description"
          content="LearnHQ is a comprehensive learning management system that provides quality education and resources to students, teachers, and parents."
        />
      </Head>
      <body>
        <Header user={user} />
        <div className="flex pb-10 md:ml-60">
          <div className="grow">{children}</div>
        </div>

        <Analytics />
      </body>
    </html>
  );
}

export default api.withTRPC(RootLayout);
