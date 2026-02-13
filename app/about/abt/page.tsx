import React from "react";
import type { Metadata } from "next";
import { AboutSection } from "~/components/About";

export const metadata: Metadata = {
  title: "About",
  authors: [
    {
      name: "Collins Ruto",
      url: "https://collinsruto.netlify.app/",
    },
  ],
  keywords: ["blog", "about", "collins"],
  twitter: { creator: "@ruto_collins_" },
};

function BlogPage() {
  // const res = await fetch(
  //   "https://raw.githubusercontent.com/Collins-Ruto/blogs/main/whoami/README.md"
  // );
  // const markdown = await res.text();

  return (
    <div className="pt-8">
     <AboutSection />
    </div>
  );
}

export default BlogPage;
//  <div className=" prose mx-auto dark:prose-invert lg:prose-xl">
//         <h1>Whoami</h1>
//         <ReactMarkdown
//           remarkPlugins={[remarkGfm]}
//           components={{
//             img: ({ node, ...props }) => (
//               <img style={{ maxWidth: "100%" }} {...props} />
//             ),
//           }}
//         >
//           {markdown}
//         </ReactMarkdown>
//       </div>
