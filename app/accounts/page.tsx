import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import AccountPage from "@/components/Account";

export default async function ViewAccount() {
    const userSession = await getServerSession();
    if (userSession == null) redirect('/')

    return ( <AccountPage user={userSession} />);
}