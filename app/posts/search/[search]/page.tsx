import NodeCards from "@/components/NodeCards";
import ApiUrl from "@/lib/url";
import { EmptyState } from "@/public/images";
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
      revalidate: 20,
    },
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      search: params.search,
    }),
  });
  const data = await res.json();

  return (
    <div className="w-full md:w-[80%] min-h-screen p-3 md:p-8 mx-auto flex flex-col pt-0 md:pt-14">
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
        {data.length == 0 ? (
          <div className="flex flex-col items-center w-full">
            <Image src={EmptyState} alt="No nodes found" />
            <Link href={"/"}>Go Back</Link>
          </div>
        ) : (
          data.map(
            (card: {
              _id: string;
              title: string;
              description: string;
              link: string;
              votes: {
                up: number;
                down: number;
              };
            }) => {
              let post: any = new Object();
              post.id = card._id;
              post.title = card.title;
              post.body = card.description;
              post.url = card.link;
              post.up = card.votes.up;
              post.down = card.votes.down;
              return <NodeCards post={post} key={post.title} />;
            }
          )
        )}
      </div>
    </div>
  );
};

export default SearchPage;
