import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AddPost from "@/components/posts/Create";

export default async function CreatePost() {
  const userSession = await getServerSession();
  if (userSession == null) redirect("/");

  return (
    <div className="w-full md:w-[80%] min-h-screen p-3 md:p-8 mx-auto flex flex-col pt-0 md:pt-14">
      <AddPost />
    </div>
  );
}
