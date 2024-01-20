import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from "next-auth";
import { dbClient } from '@/lib/db';
import User from '@/models/User';
import Post from '@/models/Post'

export async function POST(request: Request) {
  const data = await request.json()
  const client = dbClient
  const userSession = await getServerSession();
  
  const user = await User.findOne({ email: userSession?.user.email})
  const post = new Post({title: data.title, description: data.desc, link: data.link, postedBy: user._id, topics: [], comments: []  })
  post.save()

  console.log(data.title)
  return Response.json(data)
}