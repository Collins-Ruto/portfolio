"use client";

import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import { Footer, Header } from "~/components";
import { FloatingSocialBar } from "~/components/FloatingSocials";

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Define pages where styles/provider should NOT apply
  const excludedPaths = ["/about/abt", "/sorte  ", "/admin/dashboard"];
  const isExcluded = excludedPaths.includes(pathname || "");

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
          <div className="flex">
            <div className="w-full ">
              <div className="relative isolate min-h-screen overflow-hidden bg-gray-100 transition-colors duration-500 dark:bg-slate-900">
                {/* DIAGONAL SNAKE GLOW BACKGROUND */}
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                  {/* Main indigo ribbon - visible in both modes, slightly more subtle in light */}
                  <div className="absolute left-[-20%] top-[5%] h-[350px] w-[140%] -rotate-12 rounded-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent blur-[120px] dark:via-indigo-500/30" />

                  {/* Secondary emerald ribbon for that 'snake' depth */}
                  <div className="absolute left-[-30%] top-[20%] h-[300px] w-[150%] rotate-12 rounded-full bg-gradient-to-r from-transparent via-orange-500/30 to-transparent blur-[100px] dark:via-orange-400/20" />

                  {/* Secondary emerald ribbon for that 'snake' depth */}

                  <div className="absolute left-[-30%] top-[40%] h-[300px] w-[150%] -rotate-12 rounded-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent blur-[100px] dark:via-emerald-400/20" />

                  <div className="absolute bottom-[30%] right-[-10%] h-[400px] w-[80%] -rotate-12 rounded-full bg-gradient-to-l from-transparent via-pink-500/20 to-transparent blur-[120px] dark:via-pink-500/20" />
                  {/* Subtle bottom glow */}
                  <div className="absolute bottom-[10%] left-[-10%] h-[400px] w-[80%] rotate-12 rounded-full bg-gradient-to-l from-transparent via-purple-500/20 to-transparent blur-[120px] dark:via-purple-500/20" />
                </div>
                <div className="flex px-5 py-4 sm:px-6 lg:px-28 ">
                  <FloatingSocialBar />
                  <div className="container mx-auto max-w-7xl">{children}</div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
  // return (
  //   <>
  //     <ThemeProvider enableSystem={true} attribute="class">
  //       <div
  //         className={` flex min-h-[100vh] flex-col justify-between bg-gray-100 dark:bg-slate-900`}
  //       >
  //         <Header />
  //         <div className="flex px-5 py-4 sm:px-6 lg:px-28">
  //           <div className="gro container mx-auto max-w-7xl ">{children}</div>
  //         </div>
  //         <Footer />
  //       </div>
  //     </ThemeProvider>
  //   </>
  // );
};
