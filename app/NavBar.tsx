"use client";
import { Button } from "@radix-ui/themes";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const NavBar = () => {
  const { data: session, status } = useSession();
  return (
    <div className="flex justify-between bg-neutral-900 p-3 text-gray-200 fixed w-full font-semibold">
      <div>Menu search</div>
      <div className="flex">
        {session ? (
          <div>
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
