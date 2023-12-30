"use client";
import { PublicLogoClass } from "@/components/class/ClassCard";
import { ClassContext } from "@/components/class/ClassContext";
import JoinClass from "@/components/class/JoinClass";
import { useEffect, useState } from "react";
import CanvasManager from "../CanvasManager";
import ScriptEditor from "./ScriptEditor";
import ClassPanel from "./_components/ClassPanel";
import SelectClass from "./_components/SelectClass";
import { Button } from "@radix-ui/themes";
import LogoClassPanel from "@/components/class/LogoClassPanel";
import LogoDisplay from "@/components/logo/LogoDisplay";

const Console = () => {
  const [activeCommand, setActiveCommand] = useState("");
  const [logoClass, setLogoClass] = useState<PublicLogoClass | null>(null);
  const [selectingClass, setSelectingClass] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("logoClass");
    if (storedData) {
      const loadedObject = JSON.parse(storedData);
      setLogoClass(loadedObject);
    }
  }, []);

  return (
    <ClassContext.Provider value={logoClass}>
      <div className="h-screen pt-14 py-2">
        <div className="flex w-full h-full justify-between">
          <div className="flex-1 px-2">
            <ScriptEditor onExecute={setActiveCommand} />
          </div>
          <div className="">
            <CanvasManager
              width={800}
              height={600}
              commandInput={activeCommand}
            />
          </div>
          <div className="flex flex-col gap-2 flex-1 px-2">
            <LogoClassPanel />
            <div className="bg-neutral-50 rounded-lg overflow-hidden shadow-md">
              <div className="bg-neutral-200 text-center p-2">
                <span className="font-bold">Active Class</span>
              </div>
              <div className="flex items-center p-2 justify-between">
                <div>{logoClass ? logoClass.name : "class not selected"}</div>
                <Button
                  onClick={() => {
                    setSelectingClass(true);
                  }}
                >
                  {logoClass ? "Change " : "Select "} Class
                </Button>
              </div>
            </div>
            <ClassPanel />
          </div>
        </div>
        <JoinClass />
        <SelectClass
          selectingClass={selectingClass}
          setSelectingClass={setSelectingClass}
          onClassSelect={(logoClass) => {
            if (logoClass) {
              localStorage.setItem("logoClass", JSON.stringify(logoClass));
            }
            setLogoClass(logoClass);
          }}
        />
      </div>
    </ClassContext.Provider>
  );
};

export default Console;
