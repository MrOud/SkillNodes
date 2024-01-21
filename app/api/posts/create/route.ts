import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import Post from "@/models/Post";

export async function POST(request: Request) {
  const data = await request.json();
  const userSession = await getServerSession();
  const userEmail = userSession?.user?.email ?? "";
  if (!userEmail) {
    return NextResponse.redirect("/");
  }
  const user = await User.findOne({ email: userEmail });
  const post = new Post({
    title: data.title,
    description: data.desc,
    imageUrl: data.link,
    content: data.content,
    postedBy: user._id,
    topics: [],
    comments: [],
  });
  post.save();
  return Response.json(data);
}
