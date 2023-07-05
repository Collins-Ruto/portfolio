// Use the client directive for using usePathname hook.
"use client";

// Use usePathname for catching route name.
// import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { Header } from "~/components";

export const LayoutProvider = ({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) => {
  // const pathname = usePathname();

  return (
    <>
      <ThemeProvider enableSystem={true} attribute="class">
        <div className=" flex min-h-[100vh] flex-col bg-gray-100 dark:bg-slate-900">
          <div className="flex px-5 py-4 sm:px-6 lg:px-28">
            <div className="container mx-auto grow sm:overflow-auto">
              <Header />
              {children}
            </div>
          </div>
          <footer className="mt-auto border-t border-gray-300 bg-gray-800 py-4">
            <div className="container mx-auto text-center text-gray-300">
              © 2023{" "}
              <a
                className="text-blue-400"
                href="https://collinsruto.netlify.app"
              >
                Collins Ruto
              </a>{" "}
              All rights reserved.
            </div>
          </footer>
        </div>
      </ThemeProvider>
    </>
  );
};
