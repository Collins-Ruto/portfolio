"use client";

import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import { Footer, Header } from "~/components";

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Define pages where styles/provider should NOT apply
  const excludedPaths = ["/home2", "/signup", "/admin/dashboard"];
  const isExcluded = excludedPaths.includes(pathname || "") || pathname === "/";

  if (isExcluded) {
    return (
      <>
        <ThemeProvider enableSystem={true} attribute="class">
          <div
            className={` flex min-h-[100vh] flex-col justify-between bg-gray-100 dark:bg-slate-900`}
          >
            <Header />
            <div className="flex">
              <div className="w-full">{children}</div>
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </>
    ); // Return children without any wrapper styles
  }
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
