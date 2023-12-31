"use client";
import LogoDisplay from "@/components/logo/LogoDisplay";
import { Task, TaskResponse } from "@prisma/client";
import { Button, Text, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";

const TaskDetail = ({
  task,
  responseId,
  isAdmin,
}: {
  task?: Task;
  responseId: number;
  isAdmin: boolean;
}) => {
  const [textAreaContent, setTextAreaContent] = useState("");
  const [command, setCommand] = useState("");

  const [taskResponse, setTaskResponse] = useState<TaskResponse | null>();
  const [points, setPoints] = useState("");

  useEffect(() => {
    const getResponse = async () => {
      if (task) {
        const response = await fetch(
          `/api/classes/0/tasks/${task.id}/responses/${responseId}`
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
  }, [task, responseId]);

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

  const savePoints = async () => {
    if (task && taskResponse) {
      if (points === "") {
        return;
      }
      const response = await fetch(
        `/api/classes/0/tasks/${task.id}/responses/${responseId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            points: parseInt(points),
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
      <div className="p-1 bg-neutral-200 my-1">
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
          {!isAdmin && (
            <>
              <Button
                variant="surface"
                onClick={() => {
                  saveResponse();
                }}
              >
                Save
              </Button>
              <Button onClick={() => submitResponse()}>Submit</Button>
            </>
          )}
        </div>
      </div>
      {isAdmin && (
        <div className="p-1 bg-neutral-200 my-1">
          <div>Grading</div>

          <label className="flex items-center gap-2">
            <Text as="div" size="2" mb="1" weight="bold">
              Points
            </Text>
            <TextField.Input
              type="number"
              value={points}
              onChange={({ target }) => setPoints(target.value)}
              defaultValue={taskResponse?.points?.toString()}
            />
            <Button onClick={() => savePoints()}>Save</Button>
          </label>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
