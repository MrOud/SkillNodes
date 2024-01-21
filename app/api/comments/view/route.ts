import { dbClient } from "@/lib/db";
import Comment from "@/models/Comment";
import User from "@/models/User";
import mongoose from "mongoose";

export async function POST(request: Request) {
  const data = await request.json();
  const client = dbClient;
  try {
    // get comments where post id is equal to the post id and get the user name and image who posted
    const getComments = await Comment.find({
      madeOn: data.slug,
    });

    let comments: any = [];

    await Promise.all(
      getComments.map(async (comment: any) => {
        const user = await User.findOne({ _id: comment.postedBy });

        let tempComms = {
          bodyContent: comment.bodyContent,
          posterName: user.name,
          postedBy: comment.postedBy,
          madeOn: comment.madeOn,
          image: user.image,
          postedOn: comment.postedOn,
        };
        console.log(tempComms);

        comments.push(tempComms);
      })
    );
    return Response.json(comments);
  } catch (error) {
    console.log(error);
  }
}
