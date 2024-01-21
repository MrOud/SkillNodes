"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const HomeComp = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  return (
    <div className="w-[80%] h-[89vh] mx-auto flex flex-col md:pt-40 pt-14">
      <h1 className="font-bold text-8xl xl:text-9xl mx-auto text-gray-800">
        I want to learn
      </h1>
      <div className="w-full flex flex-col sm:flex-row mt-14 md:mt-24 justify-center">
        <input
          type="text"
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoCorrect="true"
          autoComplete="true"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              router.push(`/posts/search/${search}`);
            }
          }}
          placeholder="search for a topic or lessons"
          className="text-xl lg:text-4xl md:text-xl xl:text-6xl w-full max-w-5xl bg-transparent font-medium placeholder:font-medium  outline-none border-0 border-b-2 border-b-black"
        />
        <Button className="w-auto ml-0 mt-10 sm:mt-0 lg:-ml-24 md:-ml-20 font-normal px-5 py-8 md:py-7 md:px-4 text-white">
          <Link
            href={`/posts/search/${search}`}
            className="text-xl lg:text-lg md:text-base"
          >
            Search
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default HomeComp;
