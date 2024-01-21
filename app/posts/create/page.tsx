import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import AddPost from '@/components/posts/Create'

export default async function CreatePost() {
    const userSession = await getServerSession();
    if (userSession == null) redirect('/')

   
    return (
        <div className="font-sans grid w-1/3">
            
            <h1>logged in as {userSession.user?.name}</h1>
            <AddPost />
        </div>
      );
}