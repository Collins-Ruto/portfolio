// Use the client directive for using usePathname hook.
"use client";

// Use usePathname for catching route name.
// import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { Footer, Header } from "~/components";


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
        <div className={` flex min-h-[100vh] flex-col justify-between bg-gray-100 dark:bg-slate-900`}>
          <Header />
          <div className="flex px-5 py-4 sm:px-6 lg:px-28">
            <div className="container mx-auto max-w-7xl gro ">
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
};
