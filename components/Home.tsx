"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const HomeComp = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  return (
    <div className="w-[80%] h-[89vh] mx-auto flex flex-col pt-40">
      <h1 className="font-bold text-9xl mx-auto text-gray-800">
        I want to learn
      </h1>
      <div className="w-full flex flex-row mt-24 justify-center">
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
          className="text-6xl w-full max-w-5xl bg-transparent font-medium placeholder:font-medium  outline-none border-0 border-b-2 border-b-black"
        />
        <Button className="w-auto -ml-24 font-normal bg-[#00B295] px-5 py-8 text-white">
          <Link href={`/posts/search/${search}`} className="text-xl">
            Search
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default HomeComp;
