import { LogOutBtn, LogInBtn } from "@/components/auth/AuthBtns";
import { getServerSession } from "next-auth";

export default async function Home() {
  const userSession = await getServerSession();
  return (
    <div className="">
      {
        // if user is loged in show loged or else show not loged in
        userSession ? (
          <>
            <h1>loged in as {userSession.user?.email}</h1>
            <LogOutBtn />
          </>
        ) : (
          <>
            <h1>not loged in</h1>
            <LogInBtn />
          </>
        )
      }
    </div>
  );
}
