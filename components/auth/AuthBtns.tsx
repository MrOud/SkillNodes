"use client";

import { signOut, signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { LucideLogIn, LucideLogOut } from "lucide-react";

const LogOutBtn = () => {
  return (
    <Button onClick={() => signOut()}>
      Sign Out
      <LucideLogOut className="w-4 h-4 ml-3" />
    </Button>
  );
};

const LogInBtn = () => {
  return (
    <Button onClick={() => signIn("google")}>
      <LucideLogIn className="w-4 h-4 mr-3" />
      Sign In
    </Button>
  );
};

export { LogOutBtn, LogInBtn };
