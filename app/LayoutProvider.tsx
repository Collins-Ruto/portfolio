// Use the client directive for using usePathname hook.
"use client";

// Use usePathname for catching route name.
import { usePathname } from "next/navigation";
import { Header, PubHeader } from "~/components";

export const LayoutProvider = ({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  // min-h-[calc(100vh_-_2.5rem)]
  // ["/"]
  return (
    <>
      {pathname !== "/" && pathname !== "/login" && !pathname?.startsWith("/learn") ? (
        <div>
          <Header />
          <div className="flex min-h-[100vh] flex-col">
            <div className="flex md:ml-60">
              <div className="grow sm:overflow-auto">{children}</div>
            </div>
            <footer className="mt-auto border-t border-gray-300 bg-gray-800 py-4 md:ml-60">
              <div className=" mx-auto text-center text-gray-200">
                © 2023 LearnHq. All rights reserved. by{" "}
                <a href="https://collinsruto.netlify.app">Collins Ruto</a>
              </div>
            </footer>
          </div>
        </div>
      ) : (
          <div className="">
            <PubHeader />
          <div className="flex">
            <div className="grow">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};
