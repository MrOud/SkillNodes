import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Comment from "@/models/Comment";
import User from "@/models/User";
import { dbClient } from "@/lib/db";

export async function POST(request: Request) {
  const data = await request.json();

  const client = dbClient;
  const userSession = await getServerSession();
  const userEmail = userSession?.user?.email ?? "";
  if (!userEmail) {
    return NextResponse.redirect("/");
  }

  const user = await User.findOne({ email: userEmail });
  console.log(data.bodyContent);
  console.log(data.madeOn);
  console.log(user._id);

  const comment = new Comment({
    bodyContent: data.bodyContent,
    postedBy: user._id,
    madeOn: data.madeOn.toString(),
  });
  console.log("server");
  console.log(comment);

  comment.save();
  return Response.json(data);
}
