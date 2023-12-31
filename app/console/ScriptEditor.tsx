"use client";

import { Box, Button, Tabs } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import MyScripts from "./_components/MyScripts";

const ScriptEditor = ({
  onExecute,
}: {
  onExecute: (inputCommand: string) => void;
}) => {
  const [textAreaContent, setTextAreaContent] = useState("");
  const { data: session } = useSession();

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

  const saveScript = async () => {
    if (textAreaContent !== "") {
      const response = await fetch("/api/scripts", {
        method: "POST",
        body: JSON.stringify({ text: textAreaContent }),
      });
    }
  };

  return (
    <div className="flex flex-col bg-neutral-50 rounded-lg overflow-hidden shadow-md h-full">
      <div className="bg-neutral-200 text-center p-2">
        <span className="font-bold">SCRIPTS</span>
      </div>
      <Tabs.Root defaultValue="import">
        <Tabs.List>
          <Tabs.Trigger value="import">Import Script</Tabs.Trigger>
          <Tabs.Trigger value="classes">Search Script</Tabs.Trigger>
          <Tabs.Trigger value="myscript">My Script</Tabs.Trigger>
        </Tabs.List>

        <Box px="4" pt="3" pb="2">
          <Tabs.Content value="import">
            <div className="flex justify-between py-1 align-middle items-center gap-1">
              <input
                type="file"
                onChange={handleLoadFile}
                className="text-center align-middle h-full text-sm"
              />
              <Button onClick={handleSaveToFile}>Download</Button>
            </div>
          </Tabs.Content>
          <Tabs.Content value="classes"></Tabs.Content>
          <Tabs.Content value="myscript">
            <MyScripts onSelect={(script) => setTextAreaContent(script.text)} />
          </Tabs.Content>
        </Box>
      </Tabs.Root>

      <div className="flex  flex-col flex-1 p-2">
        <div className="text-sm font-semibold font-mono">Script Editor</div>
        <textarea
          className="flex-1 w-full border-yellow-500 border-4 p-1 font-mono"
          value={textAreaContent}
          onChange={(e) => setTextAreaContent(e.target.value)}
        />
        <div className="flex gap-2 py-2">
          <Button onClick={() => onExecute(textAreaContent)}>Execute</Button>
          {session && (
            <>
              <Button onClick={() => saveScript()}>Save (online)</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScriptEditor;
