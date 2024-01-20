import { Button } from "@/components/ui/button";
import { LogInBtn, LogOutBtn } from "./auth/AuthBtns";
import { getServerSession } from "next-auth";
import Link from "next/link";

const Navbar = async () => {
  const session = await getServerSession();
  return (
    <div className="w-[80%] mx-auto p-8 flex flex-row justify-between">
      <div className="">
        <h1 className="font-bold text-md">Logo</h1>
      </div>
      <div className="flex flex-row gap-5">
        <Link href="/">
          <Button variant={"ghost"}>Home</Button>
        </Link>
        {session ? (
          <>
            <Link href="/accounts">
              <Button variant={"ghost"}>Accounts</Button>
            </Link>
            <LogOutBtn />
          </>
        ) : (
          <LogInBtn />
        )}
      </div>
    </div>
  );
};

export default Navbar;
