import { Button } from "@/components/ui/button";
import ApiUrl from "@/lib/url";
import { LucideTriangle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SearchPage = async ({
  params,
}: {
  params: {
    search: string;
  };
}) => {
  const url = ApiUrl("/posts/search/");
  const res = await fetch(url, {
    next: {
      revalidate: 60,
    },
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      search: params.search,
    }),
  });
  const { data } = await res.json();

  return (
    <div className="w-full md:w-[80%] p-3 md:p-8 mx-auto flex flex-col pt-0 md:pt-14">
      <div className="p-2">
        <h1 className="text-4xl my-4 font-bold text-gray-800">
          peeping into{" "}
          {
            // convert url format to normal text
            params.search.replace(/%20/g, " ").toLowerCase()
          }
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {data.map((post: any) => (
          <NodeCards post={post} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;

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
    <div className="flex bg-white rounded-lg border-2 border-gray-100 p-3 md:p-8">
      <div className="w-[30%] flex items-center">
        <Image
          src="https://picsum.photos/200"
          alt="Node Post Image"
          width={200}
          height={200}
          className="rounded-sm w-[100px] md:w-[200px] max-w-md bg-white overflow-clip object-contain"
        />
      </div>
      <div className="w-[60%] p-4">
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
          <p>20</p>
          <Button variant={"ghost"}>
            <LucideTriangle className="w-6 h-6 rotate-180" />
          </Button>
        </div>
      </div>
    </div>
  );
};
