import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { Button, Loader } from '~/components';

const course = {
  subject: {
    name: "Physics",
    slug: "phy",
  },
  form: "2",
  title: "Refraction of Light - Introduction",
  description:
    "This course will introduce you to the basics of refraction of light",
  topic: "2.4",
  url: "https://www.youtube.com/watch?v=v5SuSB_93FM&pp=ygUUcmVmcmFjdGlvbiBvZiBsaWdodCA%3D",
  thumbnail_url: "https://i.ytimg.com/vi/v5SuSB_93FM/hqdefault.jpg",
};

const video = {
  title: "Refraction of Light - Introduction | Don\u0027t Memorise",
  author_name: "Infinity Learn Class 9\u002610",
  author_url: "https://www.youtube.com/@InfinityLearn9-10",
  type: "video",
  height: 113,
  width: 200,
  version: "1.0",
  provider_name: "YouTube",
  provider_url: "https://www.youtube.com/",
  thumbnail_height: 360,
  thumbnail_width: 480,
  thumbnail_url: "https://i.ytimg.com/vi/v5SuSB_93FM/hqdefault.jpg",
  html: "\u003ciframe width=\u0022200\u0022 height=\u0022113\u0022 src=\u0022https://www.youtube.com/embed/v5SuSB_93FM?feature=oembed\u0022 frameborder=\u00220\u0022 allow=\u0022accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\u0022 allowfullscreen title=\u0022Refraction of Light - Introduction | Don\u0026#39;t Memorise\u0022\u003e\u003c/iframe\u003e",
};

function Courses() {
  const [submit, setSubmit] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <div>
      <div className="px-4 pt-4 text-2xl font-semibold">
        <h3>Courses</h3>
      </div>
      {/* {isLoading && <Loader />} */}
      <div className="">
        <div className="flex flex-col justify-end gap-4 p-4 md:flex-row">
          <div className="">
            <input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              name="name"
              type="text"
              className="focus:shadow-outline w-full appearance-none rounded border-[1px] bg-[#F7F6FB] py-2 px-3 leading-tight text-gray-800 shadow focus:outline-none"
              placeholder="Search ID, name, username ..."
            />
          </div>
          <div className="flex justify-between gap-4">
            <div>
              {submit ? (
                <Button />
              ) : (
                <button
                  onClick={() => {
                    // searchSubmit();
                    // setSubmit(true);
                  }}
                  type="button"
                  className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                >
                  Search
                </button>
              )}
            </div>
            {/* user?.role === "admin" && */}
            {
              <div>
                <Link
                  href="/page/courses/addcourse"
                  type="button"
                  className="flex w-fit items-center rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                >
                  {" "}
                  <Image
                    width={100}
                    height={100}
                    src="https://img.icons8.com/ios-glyphs/30/FFFFFF/plus-math.png"
                    className="mr-1 w-5 text-white"
                    alt=""
                  />
                  Add
                </Link>
              </div>
            }
          </div>
        </div>
        <div className="">
          <div className="">
            <Image
              width={500}
              height={500}
              src={video.thumbnail_url}
              className="mr-1 w-5 text-white"
              alt={video.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses