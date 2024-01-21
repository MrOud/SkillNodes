import { dbClient } from "@/lib/db";
import Post from "@/models/Post";

export async function POST(request: Request) {
  const { slug } = await request.json();
  const client = dbClient;

  try {
    //   find single post by id
    const post = await Post.findOne({ _id: slug });
    return Response.json(post);
  } catch (error) {
    console.log(error);
  }
}
