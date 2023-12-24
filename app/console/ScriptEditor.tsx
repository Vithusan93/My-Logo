"use client";

import { Button } from "@radix-ui/themes";
import React, { useState } from "react";

const ScriptEditor = ({
  onExecute,
}: {
  onExecute: (inputCommand: string) => void;
}) => {
  const [textAreaContent, setTextAreaContent] = useState("");

  const handleSaveToFile = () => {
    const blob = new Blob([textAreaContent], { type: "text/plain" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "myfile.mylogo";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleLoadFile = (event: React.ChangeEvent) => {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files) {
      const file = fileInput.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setTextAreaContent(e.target.result as string);
          }
        };
        reader.readAsText(file);
      }
    }
  };

  return (
    <div className="h-[60%]">
      <div className="flex justify-between py-1 align-middle items-center gap-1">
        <input
          type="file"
          onChange={handleLoadFile}
          className="bg-green-500 text-center align-middle h-full"
        />
        <Button onClick={handleSaveToFile}>Download</Button>
      </div>
      <textarea
        className="w-full h-full"
        value={textAreaContent}
        onChange={(e) => setTextAreaContent(e.target.value)}
      />
      <div>
        <Button onClick={() => onExecute(textAreaContent)}>Execute</Button>
      </div>
    </div>
  );
};

export default ScriptEditor;
