import React from "react";

function MyHome() {
  return (
    <div>
      <div className="">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <section className="text-center">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-5xl">
              {" "}
              Hello, I am <span className="text-indigo-600">
                Collins Ruto
              </span>{" "}
            </h1>
            <p className="text-medium mx-auto mt-6 max-w-[24rem] text-gray-500">
              A Full-Stack Developer building the Frontend & Backend of Websites
              and Web Applications that leads to the success of the overall
              product
            </p>

            <a
              href="./collinsruto.pdf"
              className="mt-8 inline-block rounded bg-indigo-600 px-8 py-3 font-medium text-white shadow-lg hover:bg-indigo-700"
            >
              Download Resume
            </a>
          </section>
          <section className="my-services bg-dark text-accent relative py-16 text-center">
            <h2 className="section__title section__title--services transition-delay-300 mb-6 text-4xl font-bold">
              What I do
            </h2>
            <div className="services flex flex-wrap justify-center">
              <div className="service mx-4 mb-12 max-w-lg">
                <h3 className="section__subtitle--services transition-delay-400 mb-4 text-2xl font-bold">
                  Web Design
                </h3>
                <p className="transition-delay-500 text-lg">
                  I build and design impressive and user-friendly websites with
                  a focus on exceptional user experience and functionality. I
                  integrate high-quality search engine optimization (SEO)
                  practices to achieve high Google rankings, ensuring your
                  offerings reach a wider audience.
                </p>
              </div>

              <div className="service mx-4 mb-12 max-w-lg">
                <h3 className="section__subtitle--services transition-delay-600 mb-4 text-2xl font-bold">
                  Software Development
                </h3>
                <p className="transition-delay-700 text-lg">
                  In this era of increased digital dependence, I develop
                  high-end software solutions tailored to your specific needs
                  across multiple platforms. With expertise in JavaScript,
                  TypeScript, React, Next.js, Node.js, Express, MongoDB, Python,
                  and Rust, I deliver exceptional software that aligns with your
                  business goals.
                </p>
              </div>

              <div className="service mx-4 mb-12 max-w-lg">
                <h3 className="section__subtitle--services transition-delay-800 mb-4 text-2xl font-bold">
                  Web3 Development
                </h3>
                <p className="transition-delay-900 text-lg">
                  As a NEAR Protocol certified web3 developer, I specialize in
                  building secure smart contracts on the blockchain using Rust
                  and Solidity languages. I connect these contracts with
                  intuitive front-end interfaces using ReactJS and Next.js to
                  create fast and responsive web applications for the
                  decentralized future.
                </p>
              </div>
            </div>
            <a
              href="#work"
              className="btnn bg-accent text-dark hover:bg-light hover:text-accent inline-block rounded-full px-6 py-3 font-semibold transition duration-300"
            >
              My Work
            </a>
          </section>
          <section className="about--me text-dark bg-white py-16">
            <div className="about-me mx-auto max-w-5xl px-4">
              <h2 className="section__title section__title--about mb-4 text-4xl font-bold">
                Who Am I
              </h2>
              <p className="section__subtitle section__subtitle--about mb-8 text-lg font-semibold">
                Designer & Developer based in Mombasa, Kenya
              </p>
              <div className="about-me__body mb-8 text-lg">
                <p>
                  I'm a freelance web developer and designer based in Mombasa,
                  Kenya. I believe life is all about pursuing your dreams and
                  finding what makes you happy. My goal is to help individuals
                  and businesses turn their ideas into functional websites and
                  applications that not only work effectively but also reach
                  their target audience and experience exponential growth.
                </p>
                <p>
                  You might wonder, why choose me? Well, I can assist you in
                  building a website that serves your purpose and elevates your
                  business by delivering the best client experience. I
                  understand that the first impression matters, and a
                  well-designed website allows you to establish a warm and
                  productive relationship with your clients right from the
                  start.
                </p>
              </div>
              <img
                src="/img/25.webp"
                alt="collins"
                className="about-me__img mx-auto rounded-lg shadow-md"
              />
            </div>
          </section>
          <section className="lifestyle bg-gray-100 py-16">
            <div className="life-style mx-auto max-w-5xl px-4">
              <h2 className="section__title section__title--life-style mb-8 text-4xl font-bold">
                Lifestyle
              </h2>
              <div className="lifestyle-item flex flex-col items-center md:flex-row md:items-start">
                <div className="lifestyle-text md:mr-8">
                  <p className="text-lg">
                    I love open source because it provides opportunities for
                    learning, growth, and helping others. Although I'm
                    relatively new to web development with less than a year of
                    experience, I dedicate time to contribute to other
                    developers' projects on platforms like GitHub and Stack
                    Overflow. This approach allows me to learn more and enhance
                    my foundational knowledge.
                  </p>
                </div>
                <div className="life-img">
                  <img
                    src="/img/42.webp"
                    alt="teams"
                    className="lifestyle__img rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="tools bg-gray-100 py-16">
            <div className="toolss mx-auto max-w-5xl px-4">
              <h2 className="section__title section__title--tools mb-8 text-4xl font-bold">
                My Tools
              </h2>
              <div className="toolbox-wrapper flex flex-col md:flex-row">
                <div className="toolbox-card md:mr-8">
                  <div className="tools-container">
                    <ul className="tool-list">
                      <li className="tool-list-item flex items-center">
                        <div className="tool-self">
                          <img
                            src="/svg/html5.svg"
                            alt="html icon"
                            className="tool__img"
                          />
                        </div>
                        <span className="tool-name ml-2">HTML</span>
                      </li>
                      <li className="tool-list-item flex items-center">
                        <div className="tool-self">
                          <img
                            src="/svg/css.svg"
                            alt="css icon"
                            className="tool__img"
                          />
                        </div>
                        <span className="tool-name ml-2">CSS</span>
                      </li>
                      <li className="tool-list-item flex items-center">
                        <div className="tool-self">
                          <img
                            src="/svg/javascript.svg"
                            alt="javascript icon"
                            className="tool__img"
                          />
                        </div>
                        <span className="tool-name ml-2">JavaScript</span>
                      </li>
                      <li className="tool-list-item flex items-center">
                        <div className="tool-self">
                          <img
                            src="/svg/php.png"
                            alt="php icon"
                            className="tool__img"
                          />
                        </div>
                        <span className="tool-name ml-2">PHP</span>
                      </li>
                      {/* Repeat the same structure for other tools */}
                    </ul>
                  </div>
                </div>
                <div className="toolbox-card">
                  <div className="tools-container">
                    <ul className="tool-list">
                      <li className="tool-list-item flex items-center">
                        <div className="tool-self">
                          <img
                            src="/svg/vscode.svg"
                            alt="vs code icon"
                            className="tool__img"
                          />
                        </div>
                        <span className="tool-name ml-2">VS Code</span>
                      </li>
                      <li className="tool-list-item flex items-center">
                        <div className="tool-self">
                          <img
                            src="/svg/sublime-text.svg"
                            alt="sublime icon"
                            className="tool__img"
                          />
                        </div>
                        <span className="tool-name ml-2">Sublime Text</span>
                      </li>
                      <li className="tool-list-item flex items-center">
                        <div className="tool-self">
                          <img
                            src="/svg/github.svg"
                            alt="github icon"
                            className="tool__img"
                          />
                        </div>
                        <span className="tool-name ml-2">GitHub</span>
                      </li>
                      <li className="tool-list-item flex items-center">
                        <div className="tool-self">
                          <img
                            src="/svg/stack-overflow.svg"
                            alt="stack icon"
                            className="tool__img"
                          />
                        </div>
                        <span className="tool-name ml-2">Stack Overflow</span>
                      </li>
                      {/* Repeat the same structure for other tools */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default MyHome;
