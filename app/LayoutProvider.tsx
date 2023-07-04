// Use the client directive for using usePathname hook.
"use client";

// Use usePathname for catching route name.
// import { usePathname } from "next/navigation";
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
      <div>
        <Header />
        <div className="flex min-h-[100vh] flex-col">
          <div className="flex">
            <div className="grow sm:overflow-auto">{children}</div>
          </div>
          <footer className="mt-auto border-t border-gray-300 bg-gray-800 py-4">
            <div className="container mx-auto text-center text-gray-300">
              © 2023 <a className="text-blue-400" href="https://collinsruto.netlify.app">Collins Ruto</a>{" "}
              All rights reserved.
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};
