// Use the client directive for using usePathname hook.
"use client";

// Use usePathname for catching route name.
import { usePathname } from "next/navigation";
import { Header } from "~/components";

export const LayoutProvider = ({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  return (
    <>
      {pathname !== "/" && pathname !== "/login" ? (
        <div>
          <Header />
          <div className="flex pb-10 md:ml-60">
            <div className="grow">{children}</div>
          </div>
          <footer className="w-full border-t border-gray-300 bg-gray-800 py-4">
            <div className="container mx-auto text-center text-gray-200">
              © 2023 LearnHq. All rights reserved. by{" "}
              <a href="https://collinsruto.netlify.app">Collins Ruto</a>
            </div>
          </footer>
        </div>
      ) : (
        <div className="">
          <div className="flex">
            <div className="grow">{children}</div>
          </div>
          <footer className="w-full border-t border-gray-300 bg-gray-800 py-4">
            <div className="container mx-auto text-center text-gray-200">
              © 2023 LearnHq. All rights reserved. by{" "}
              <a href="https://collinsruto.netlify.app">Collins Ruto</a>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};
