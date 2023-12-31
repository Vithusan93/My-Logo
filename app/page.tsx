import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  router.push("/console");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={"/console"}>
        <Button>Console</Button>
      </Link>
    </main>
  );
}
