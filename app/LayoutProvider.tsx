"use client";

import { ThemeProvider } from "next-themes";
import { Footer, Header } from "~/components";

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider enableSystem={true} attribute="class">
        <div
          className={` flex min-h-[100vh] flex-col justify-between bg-gray-100 dark:bg-slate-900`}
        >
          <Header />
          <div className="flex px-5 py-4 sm:px-6 lg:px-28">
            <div className="gro container mx-auto max-w-7xl ">{children}</div>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
};
