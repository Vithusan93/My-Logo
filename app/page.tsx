"use client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={"/console"}>
        <Button>Console</Button>
      </Link>
    </main>
  );
}
