"use client";
import LogoDisplay from "@/components/logo/LogoDisplay";
import { Task, TaskResponse } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

const TaskDetail = ({ task }: { task?: Task }) => {
  const [textAreaContent, setTextAreaContent] = useState("");
  const [command, setCommand] = useState("");

  const [taskResponse, setTaskResponse] = useState<TaskResponse | null>();

  useEffect(() => {
    const getResponse = async () => {
      if (task) {
        const response = await fetch(
          `/api/classes/0/tasks/${task.id}/responses/0`
        );
        if (response.ok) {
          const responseData = await response.json();
          setTextAreaContent(responseData.script);
          setTaskResponse(responseData);
        }
        if (response.status === 404) {
          setTextAreaContent("");
          setCommand("");
        }
      }
    };
    getResponse();
  }, [task]);

  const saveResponse = async () => {
    if (task) {
      const response = await fetch(
        `/api/classes/0/tasks/${task.id}/responses`,
        {
          method: "PATCH",
          body: JSON.stringify({
            script: textAreaContent,
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();

        setTaskResponse(responseData);
      }
    }
  };

  const submitResponse = async () => {
    if (task) {
      const response = await fetch(
        `/api/classes/0/tasks/${task.id}/responses`,
        {
          method: "PATCH",
          body: JSON.stringify({
            script: textAreaContent,
            isSubmitted: true,
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setTaskResponse(responseData);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="bg-neutral-200 text-center p-1 border-r-2 border-gray-400">
        <span className="font-bold">Task Detail</span>
      </div>
      <div className="bg-neutral-100 p-2 rounded-md">
        {task ? `Question: ${task.question}` : "Select a task"}
      </div>
      <div className="min-h-1/2">
        <LogoDisplay width={800} height={600} commandInput={command} />
      </div>
      <div className="p-2">
        <div>Response</div>
        <div>
          <textarea
            className="w-full h-full border-yellow-500 border-4 p-1 font-mono"
            value={textAreaContent}
            onChange={(e) => setTextAreaContent(e.target.value)}
            defaultValue={taskResponse?.script}
            readOnly={taskResponse?.isSubmitted}
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
          <Button
            variant="surface"
            onClick={() => {
              saveResponse();
            }}
          >
            Save
          </Button>
          <Button onClick={() => submitResponse()}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
