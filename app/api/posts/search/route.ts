import { dbClient } from "@/lib/db";
import Post from "@/models/Post";

export async function POST(request: Request) {
  const data = await request.json();
  const client = dbClient;
  try {
    const post = await Post.find({
      $or: [
        { title: new RegExp(data.search, "i") },
        { description: new RegExp(data.search, "i") },
      ],
    });
    return Response.json(post);
  } catch (error) {
    console.log(error);
  }
}
