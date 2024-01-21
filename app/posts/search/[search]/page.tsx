import NodeCards from "@/components/NodeCards";
import ApiUrl from "@/lib/url";

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
  const data = await res.json();
  console.log(data)

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
        {data.map((card) => {
            let post = new Object
            post.title = card.title
            post.body = card.description
            post.url = card.link
            post.up = card.votes.up
            post.down = card.votes.down
            console.log(post)
            return <>
            <NodeCards post={post} />
            </>
        })}
      </div>
    </div>
  );
};

export default SearchPage;
