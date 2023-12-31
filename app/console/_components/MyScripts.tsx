import { Script } from "@prisma/client";
import React, { useEffect, useState } from "react";

const MyScripts = ({ onSelect }: { onSelect: (script: Script) => void }) => {
  const [scripts, setScripts] = useState<Script[]>([]);
  useEffect(() => {
    const getScripts = async () => {
      const response = await fetch("/api/scripts/", { cache: "no-store" });
      if (response.ok) {
        const responseData = await response.json();
        setScripts(responseData);
      }
    };
    getScripts();
  }, []);
  return (
    <div>
      {scripts.map((script) => (
        <div
          key={script.id}
          onClick={() => onSelect(script)}
          className="text-xs bg-gray-200 p-1 my-1 rounded-md cursor-pointer"
        >
          {script.text}
        </div>
      ))}
    </div>
  );
};

export default MyScripts;
