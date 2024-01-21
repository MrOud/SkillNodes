"use client";

import { Button } from "./ui/button";
import { useState } from "react";
import Image from "next/image";
import { LandingPageIllustration } from "@/public/images";
import { toast } from "./ui/use-toast";
import { TypeAnimation } from "react-type-animation";
import { LucideArrowDownRight, LucideChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const HomeComp = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const searchNodeQuery = () => {
    if (search.trim() === "") {
      toast({
        title: "Search field is empty",
        description: "Please enter a valid search term",
        variant: "destructive",
      });
      return;
    }
    router.push(`/posts/search/${search}`);
  };

  const TypingAnimationSequence = [
    // Same substring at the start will only be typed out once, initially
    "I want to learn",
    8000, // wait 1s before replacing "Mice" with "Hamsters"
    "I want to explore",
    5000,
    "I want to know",
    5000,
  ];
  return (
    <div className="w-[80%] min-h-[80vh] md:min-h-[89vh] mx-auto flex flex-col md:pt-40 pt-14">
      <h1 className="font-bold text-8xl xl:text-9xl mx-auto text-gray-800">
        I want to learn
      </h1>
      {/* <h1 className="lg:hidden font-bold text-8xl xl:text-9xl mx-auto text-gray-800">
        I want to learn
      </h1>
      <TypeAnimation
        sequence={TypingAnimationSequence}
        wrapper="span"
        speed={2}
        className="hidden lg:block
        font-bold text-8xl xl:text-9xl mx-auto text-gray-800
        "
        style={{ fontSize: "9rem" }}
        repeat={Infinity}
      /> */}
      <div className="z-50 w-full flex flex-col sm:flex-row mt-14 md:mt-24 justify-center">
        <input
          type="text"
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoCorrect="true"
          autoComplete="true"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchNodeQuery();
            }
          }}
          placeholder="search for a topic or lessons"
          className="text-xl lg:text-4xl md:text-xl xl:text-6xl w-full max-w-5xl bg-transparent font-medium placeholder:font-medium  outline-none border-0 border-b-2 border-b-black"
        />
        <Button
          disabled={search.trim() === ""}
          onClick={searchNodeQuery}
          className="text-xl flex lg:text-lg md:text-base w-auto ml-0 mt-10 sm:mt-0 lg:-ml-24 md:-ml-20 font-normal px-5 py-8 md:py-7 md:px-4 text-white"
        >
          Search
          <LucideChevronRight className="w-6 h-6 ml-1" />
        </Button>
      </div>
      <Image
        src={LandingPageIllustration}
        alt="Landing Page"
        className="absolute bottom-0 left-0"
      />
    </div>
  );
};

export default HomeComp;
