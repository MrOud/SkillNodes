import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from "next-auth";
import { dbClient } from '@/lib/db';
import User from '@/models/User';
import Post from '@/models/Post'

export async function POST(request: Request) {
  const data = await request.json()
  const client = dbClient
  
  const user = await User.findOne({ email: data.user})
  const posts = await Post.find({postedBy: user._id})

  return Response.json(posts)
}