"use client";
import CanvasManager from "./CanvasManager";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CanvasManager width={800} height={600} />
    </main>
  );
}
