import React from "react";
import type { Metadata } from "next";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: "All About Collins",
  
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
  //   // "https://raw.githubusercontent.com/Collins-Ruto/collins-ruto/main/README.md"
  //   "https://raw.githubusercontent.com/Collins-Ruto/blogs/main/whoami/README.md"
  // );
  // const markdown = await res.text();
  

  return (
    <div className="pt-8">
      <div className="prose mx-auto dark:prose-invert lg:prose-xl ">
        <h1>Whoami</h1>
        <p>
          I&apos;m Collins Ruto, a full-stack developer from Mombasa, Kenya{" "}
          <span role="img" aria-label="Kenya Flag">
            🇰🇪
          </span>
          . Experienced in full-stack web, web3, and software development, with
          some knowledge in Android development and a strong drive to inspire
          and mentor upcoming developers worldwide.
        </p>
        <h4>Social tags</h4>
        <p className="flex flex-wrap gap-2">
          <a
            href="https://twitter.com/ruto_collins_"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              height={100}
              width={100}
              src="https://img.shields.io/badge/-@ruto_collins_-1ca0f1?style=flat&labelColor=1ca0f1&logo=twitter&logoColor=white"
              alt="Twitter Badge"
            />
          </a>
          <a
            href="https://codepen.com/collins-ruto"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              height={100}
              width={100}
              src="https://img.shields.io/badge/-CodePen-gray?style=flat&labelColor=gray&logo=codepen&logoColor=white"
              alt="Codepen Badge"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/collins-ruto/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              height={100}
              width={100}
              src="https://img.shields.io/badge/-LinkedIn-0e76a8?style=flat&labelColor=0e76a8&logo=linkedin&logoColor=white"
              alt="Linkedin Badge"
            />
          </a>
          <a
            href="https://instagram.com/colins_ruto"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              height={100}
              width={100}
              src="https://img.shields.io/badge/-Instagram-e84393?style=flat&labelColor=e84393&logo=instagram&logoColor=white"
              alt="Instagram Badge"
            />
          </a>
          <a
            href="https://stackoverflow.com/users/17242991/collins-ruto"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              height={100}
              width={100}
              src="https://img.shields.io/badge/-StackOverflow-1ca0f1?style=flat&labelColor=1ca0f1&logo=stackoverflow&logoColor=white"
              alt="Stackoverflow Badge"
            />
          </a>
          <a
            href="mailto:collinsruto48@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              height={100}
              width={100}
              src="https://img.shields.io/badge/-Gmail-c0392b?style=flat&labelColor=c0392b&logo=gmail&logoColor=white"
              alt="Mail Badge"
            />
          </a>
        </p>
        <h3>What am I doing?</h3>
        <ul>
          <li>
            I&apos;m currently working on a project called DevsQuest, a web
            application for developers.
          </li>
          <li>Learning solidity for web3 and smart contract development.</li>
          <li>
            Looking to collaborate with other developers on the DevsQuest
            project.
          </li>
          <li>You can reach me at collinsruto48@gmail.com.</li>
        </ul>
        <p>
          My website:{" "}
          <a href="https://collinsruto.netlify.app">
            https://collinsruto.netlify.app
          </a>
        </p>
        <h3>Top Technologies</h3>
        <p>Links take you to repositories utilizing them. Give it a try.</p>
        <p className="flex flex-wrap gap-2">
          <a
            href="https://github.com/collins-ruto/wallpaper-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              height={100}
              width={100}
              src="https://img.shields.io/badge/-React-61DBFB?style=for-the-badge&labelColor=black&logo=react&logoColor=61DBFB"
              alt="React Badge"
            />
          </a>
          <a
            href="https://github.com/collins-ruto/wallpaper-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              height={100}
              width={100}
              src="https://img.shields.io/badge/-Javascript-F0DB4F?style=for-the-badge&labelColor=black&logo=javascript&logoColor=F0DB4F"
              alt="Javascript Badge"
            />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Image
              height={100}
              width={100}
              src="https://img.shields.io/badge/-Typescript-007acc?style=for-the-badge&labelColor=black&logo=typescript&logoColor=007acc"
              alt="Typescript Badge"
            />
          </a>
          <a
            href="https://github.com/collins-ruto/christmas-tree-python"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              height={100}
              width={100}
              src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&labelColor=black&logo=python&logoColor=ffdd54"
              alt="Python Badge"
            />
          </a>
          <a
            href="https://github.com/collins-ruto/wallpaper-app/server"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              height={100}
              width={100}
              src="https://img.shields.io/badge/-Nodejs-3C873A?style=for-the-badge&labelColor=black&logo=node.js&logoColor=3C873A"
              alt="Nodejs Badge"
            />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Image
              height={100}
              width={100}
              src="https://img.shields.io/badge/-GraphQl-e535ab?style=for-the-badge&labelColor=black&logo=node.js&logoColor=e535ab"
              alt="GraphQL Badge"
            />
          </a>
          <a
            href="https://github.com/collins-ruto/restaurant-reviews"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              height={100}
              width={100}
              src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&labelColor=black&logo=mongodb&logoColor=white"
              alt="MongoDB Badge"
            />
          </a>
          <a
            href="https://github.com/collins-ruto/my-portfolio"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              height={100}
              width={100}
              src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&labelColor=black&logo=html5&logoColor=white"
              alt="HTML5 Badge"
            />
          </a>
        </p>
        <h3>Tools</h3>
        <p className="flex flex-wrap gap-2">
          <Image
            height={50}
            width={80}
            src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white"
            alt="Visual Studio Code"
          />
          <Image
            height={50}
            width={80}
            src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white"
            alt="Figma"
          />
          <Image
            height={50}
            width={80}
            src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"
            alt="GitHub"
          />
          <Image
            height={50}
            width={80}
            src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white"
            alt="Git"
          />
          <Image
            height={50}
            width={80}
            src="https://img.shields.io/badge/google-4285F4?style=for-the-badge&logo=google&logoColor=white"
            alt="Google"
          />
          <Image
            height={50}
            width={80}
            src="https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white"
            alt="Ubuntu"
          />
        </p>
        <h3>Stats</h3>
        <p className="flex w-full flex-wrap gap-2">
          <Image
            height={600}
            width={400}
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=collins-ruto&layout=compact"
            alt="Top Languages"
          />
          <Image
            height={400}
            width={400}
            src="https://github-readme-stats.vercel.app/api?username=collins-ruto&show_icons=true&theme=radical&count_private=true"
            alt="Collins&apos; GitHub stats"
          />
        </p>
        <h4>Coding stats</h4>
        <p>
          <a href="https://wakatime.com/@426a2cff-37ab-4579-87f6-d3f2fa22c2a8">
            <Image
              src="https://wakatime.com/badge/user/426a2cff-37ab-4579-87f6-d3f2fa22c2a8.svg"
              alt="Wakatime Badge 2"
              width={200}
              height={100}
            />
          </a>
        </p>
        <h2>More stuff about me</h2>
        <h4>What is DevsQuest?</h4>
        <p>
          It is meant to connect and build communities of developers where we
          can organize, link, and build working teams for educational and
          development purposes. Catch phrase: Code and Coffee. I&apos;ll be building
          it gradually and adding new features with time, and hopefully launch
          it soon. In the end, it should have games, challenges, collaborations,
          blogs, and a forum. The project is part of my learning of React and
          when I&apos;m proficient enough, I&apos;ll be able to develop it further.
        </p>
        <h4>A bit more</h4>
        <p>
          I love engineering, IoT, programming, and computers. It all started
          with an old IBM computer that we had at home. Back then, we only drew
          stuff with Microsoft Paint, but I grew curious about how it worked and
          everything about it. And voila, here I am learning and developing
          using the same curiosity. The little things and steps are key. Keep
          learning and write it all down in code. Did I mention I&apos;m also a
          marine engineering student? Well, that&apos;s what I do at the Technical
          University of Mombasa.
        </p>
        <h4>Likes</h4>
        <ul>
          <li>Dogs</li>
          <li>Tea & Coffee</li>
          <li>Video games</li>
          <li>Novels</li>
          <li>Movie series</li>
          <li>Astro Documentaries</li>
          <li>Classic music</li>
          <li>Swimming</li>
        </ul>
        <p>
          <a href="#">Back home</a>
        </p>
        <h5>
          Credits to <a href="https://github.com/ipenywis">ipenywis</a>
        </h5>
        <p>🦝⚡️🥂🏆🚀⚙️🌐🇰🇪🖥️🐶🫂🎲🎙️📢💬</p>
      </div>
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