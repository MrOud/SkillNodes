import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LucideTriangle } from "lucide-react";

const NodeCards = ({
  post,
}: {
  post: {
    title: string;
    body: string;
    url: string;
  };
}) => {
  return (
    <div className="flex bg-white rounded-lg border-2 border-gray-100 p-3 md:p-4">
      <div className="w-[30%] flex items-center">
        <Image
          src="https://picsum.photos/200"
          alt="Node Post Image"
          width={200}
          height={200}
          className="rounded-sm w-[75px] h-auto md:w-[150px] md:h-auto max-w-md bg-white overflow-clip object-contain"
        />
      </div>
      <div className="w-[60%] p-6">
        <Link href={post.url} className="flex flex-col gap-5">
          <h1 className="font-semibold text-xl md:text-2xl line-clamp-2 md:line-clamp-3">
            {post.title}
          </h1>
          <p className="text-gray-600 line-clamp-2 md:line-clamp-5">
            {post.body}
          </p>
        </Link>
      </div>
      <div className="w-[10%] flex flex-col justify-center">
        <div className="flex flex-col gap-5 items-center h-auto">
          <Button variant={"ghost"}>
            <LucideTriangle className="w-6 h-6" />
          </Button>
          <p>{post.up - post.down}</p>
          <Button variant={"ghost"}>
            <LucideTriangle className="w-6 h-6 rotate-180" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NodeCards;
