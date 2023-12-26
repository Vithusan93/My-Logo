"use client";
import { Button } from "@radix-ui/themes";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const NavBar = () => {
  const { data: session, status } = useSession();
  return (
    <div className="flex justify-between bg-green-200 p-3 text-gray-800 fixed w-full font-semibold">
      <div>Menu search</div>
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
