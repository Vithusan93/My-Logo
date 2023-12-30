"use client";
import LogoDisplay from "@/components/logo/LogoDisplay";
import { Button } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

interface CanvasManagerProps {
  commandInput?: string;
}

interface Position {
  x: number;
  y: number;
  angle: number;
}

const simpleSquare = "REPETE 4 [AV 100 TD 90]";

const CanvasManager: React.FC<CanvasManagerProps> = ({ commandInput }) => {
  const [inputValue, setInputValue] = useState<string>(simpleSquare);

  const [activeCommand, setActiveCommand] = useState("");

  useEffect(() => {
    if (commandInput) {
      setActiveCommand(commandInput);
    }
  }, [commandInput]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setActiveCommand(inputValue);
    }
  };

  return (
    <div className="bg-neutral-200 rounded-lg overflow-hidden shadow-md">
      <div className="text-center p-2">
        THE <span className="font-bold">LOGO</span> GAME
      </div>
      <LogoDisplay width={800} height={600} commandInput={activeCommand} />
      <div className="flex p-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="w-full border-2 border-yellow-500 px-2"
          placeholder="Type your commands and press Enter to execute"
        />
        <Button
          onClick={() => {
            setActiveCommand(inputValue);
          }}
        >
          Execute
        </Button>
      </div>
      <div className="text-center p-2">Usefull buttons can come here</div>
    </div>
  );
};

export default CanvasManager;
