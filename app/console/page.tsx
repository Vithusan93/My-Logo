"use client";
import { useState } from "react";
import CanvasManager from "../CanvasManager";
import ScriptEditor from "./ScriptEditor";

const Console = () => {
  const [activeCommand, setActiveCommand] = useState("");

  return (
    <div className="h-screen">
      <div className="bg-green-300 p-3 fixed w-full font-semibold">
        Menu search{" "}
      </div>
      <div className="flex w-full h-full justify-between">
        <div className="flex-1 bg-green-200 pt-14 px-2">
          <ScriptEditor onExecute={setActiveCommand} />
        </div>
        <div className="bg-green-50 pt-14 px-2">
          <CanvasManager
            width={800}
            height={600}
            commandInput={activeCommand}
          />
        </div>
        <div className="flex-1 bg-green-200">C</div>
      </div>
    </div>
  );
};

export default Console;
