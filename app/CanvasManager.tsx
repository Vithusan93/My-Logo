"use client";
import LogoDisplay from "@/components/logo/LogoDisplay";
import { Button } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

interface CanvasManagerProps {
  commandInput?: string;
}

const CanvasManager: React.FC<CanvasManagerProps> = ({ commandInput }) => {
  return (
    <div className="bg-neutral-200 rounded-lg overflow-hidden shadow-md">
      <div className="text-center p-2">
        THE <span className="font-bold">LOGO</span> GAME
      </div>
      <LogoDisplay width={800} height={600} commandInput={commandInput} />
      <div className="text-center p-2">Usefull buttons can come here</div>
    </div>
  );
};

export default CanvasManager;
