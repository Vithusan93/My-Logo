"use client";
import { Button, Theme } from "@radix-ui/themes";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { data: session, status } = useSession();
  return (
    <Theme appearance="dark">
      <div className="flex justify-between p-3  fixed w-full font-semibold">
        <div className="flex gap-2 items-center">
          <div className="font-medium bg-gray-100 px-2 py-1 rounded-md text-gray-800">
            THE <span className="font-bold">LOGO</span> GAME
          </div>
          <Link href={"/console"}>
            <div>Console</div>
          </Link>
          <Link href={"/classes"}>
            <div>Classes</div>
          </Link>
        </div>
        <div className="">
          {session ? (
            <div className="flex items-center gap-2 justify-center">
              {session?.user?.email}{" "}
              <Button onClick={() => signOut()}>Sign Out</Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href={"/auth/signup"}>
                <Button variant="surface">Sign Up </Button>
              </Link>
              <Button onClick={() => signIn()}>Sign In </Button>
            </div>
          )}
        </div>
      </div>
    </Theme>
  );
};

export default NavBar;
