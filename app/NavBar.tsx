"use client";
import { Button } from "@radix-ui/themes";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { data: session, status } = useSession();
  return (
    <div className="flex justify-between bg-green-200 p-3 text-gray-800 fixed w-full font-semibold">
      <div className="flex gap-2 items-center">
        <div>LOGOGAME</div>
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
            <Button variant="outline" onClick={() => signOut()}>
              Sign Out
            </Button>
          </div>
        ) : (
          <div>
            <Button onClick={() => signIn()}>Sign In </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
