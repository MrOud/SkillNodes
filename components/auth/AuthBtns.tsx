"use client";
import { signOut, signIn } from "next-auth/react";

const LogOutBtn = () => {
  return <button onClick={() => signOut()}>Sign Out</button>;
};

const LogInBtn = () => {
  return <button onClick={() => signIn()}>Sign In</button>;
};

export { LogOutBtn, LogInBtn };
