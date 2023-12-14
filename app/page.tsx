"use client"
import Image from 'next/image'
import CanvasManager from './component/CanvasManager'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CanvasManager width={800} height={600} />
    </main>
  )
}
