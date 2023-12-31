"use client";
import LogoDisplay from "@/components/logo/LogoDisplay";
import React from "react";

interface CanvasManagerProps {
  commandInput?: string;
}

const CanvasManager: React.FC<CanvasManagerProps> = ({ commandInput }) => {
  return (
    <div className="flex flex-col bg-neutral-200 rounded-lg overflow-hidden shadow-md h-full">
      <div className="text-center p-2">
        THE <span className="font-bold">LOGO</span> GAME
      </div>
      <div className="flex-1">
        <LogoDisplay width={800} height={600} commandInput={commandInput} />
      </div>
      <div className="text-center p-2">Usefull buttons can come here</div>
    </div>
  );
};

export default CanvasManager;
