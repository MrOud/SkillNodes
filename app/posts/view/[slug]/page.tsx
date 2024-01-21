import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import parse from "html-react-parser";
import ApiUrl from "@/lib/url";
import NodeComments from "@/components/posts/NodeComments";

const SkillNodePostPage = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const url = ApiUrl("/posts/view/");
  const res = await fetch(url, {
    next: {
      revalidate: 60,
    },
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      slug: params.slug,
    }),
  });
  const data = await res.json();

  return (
    <div className="w-full md:w-[80%]  min-h-screen p-3 md:p-8 mx-auto flex flex-col pt-0 md:pt-14">
      <div className="flex gap-4">
        <div className="w-1/2 flex flex-col gap-5 max-w-2xl">
          <div className="flex flex-col gap-5 bg-white rounded-lg p-6">
            <h1 className="font-semibold text-2xl md:text-4xl">{data.title}</h1>
            <p className="text-balance">{data.description}</p>
            <Image
              src={data.link}
              width={500}
              height={200}
              alt="Node Post Image"
              className="rounded-sm overflow-clip object-contain"
            />

            <Separator orientation="horizontal" />
            <div className="">{parse(data.content)}</div>
          </div>
        </div>
        <Separator orientation="vertical" />
        <div className="w-1/2">
          <NodeComments slug={params.slug} />
        </div>
      </div>
    </div>
  );
};

export default SkillNodePostPage;
