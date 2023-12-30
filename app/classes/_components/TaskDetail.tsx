import LogoDisplay from "@/components/logo/LogoDisplay";
import { Task } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import React, { useState } from "react";

const TaskDetail = ({ task }: { task?: Task }) => {
  const [textAreaContent, setTextAreaContent] = useState("");
  const [command, setCommand] = useState("");

  return (
    <div className="w-full">
      <div className="bg-neutral-200 text-center p-1 border-r-2 border-gray-400">
        <span className="font-bold">Task Detail</span>
      </div>
      <div className="bg-neutral-100 p-2 rounded-md">
        {task ? `Question: ${task.question}` : "Select a task"}
      </div>
      <div className="h-1/2">
        <LogoDisplay width={800} height={600} commandInput={command} />
      </div>
      <div>
        <div>Response</div>
        <div>
          <textarea
            className="w-full h-full border-yellow-500 border-4 p-1 font-mono"
            value={textAreaContent}
            onChange={(e) => setTextAreaContent(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="surface"
            onClick={() => {
              setCommand(textAreaContent);
            }}
          >
            Execute
          </Button>
          <Button variant="surface">Save</Button>
          <Button>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
