"use client";

import { signOut, signIn } from "next-auth/react";
import { Button } from "../ui/button";

const LogOutBtn = () => {
  return <Button onClick={() => signOut()}>Sign Out</Button>;
};

const LogInBtn = () => {
  return <Button onClick={() => signIn()}>Sign In</Button>;
};

export { LogOutBtn, LogInBtn };
