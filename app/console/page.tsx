"use client";
import JoinClass from "@/components/class/JoinClass";
import { useState } from "react";
import CanvasManager from "../CanvasManager";
import LogoClassPanel from "./LogoClassPanel";
import ScriptEditor from "./ScriptEditor";
const Console = () => {
  const [activeCommand, setActiveCommand] = useState("");

  return (
    <div className="h-screen">
      <div className="flex w-full h-full justify-between">
        <div className="flex-1 bg-slate-300  px-2">
          <ScriptEditor onExecute={setActiveCommand} />
        </div>
        <div className="bg-slate-300">
          <CanvasManager
            width={800}
            height={600}
            commandInput={activeCommand}
          />
        </div>
        <div className="flex-1 bg-slate-300  px-2">
          <LogoClassPanel />
        </div>
      </div>
      <JoinClass />
    </div>
  );
};

export default Console;
