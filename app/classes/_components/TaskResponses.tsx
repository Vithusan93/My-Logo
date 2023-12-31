import { Task, TaskResponse, User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";

export interface TaskResponseDetail extends TaskResponse {
  student: { id: number; name: string };
}

const TaskResponses = ({
  task,
  onResponseSelect,
}: {
  task?: Task;
  onResponseSelect: (taskResponse: TaskResponseDetail) => void;
}) => {
  const [taskResponses, setTaskResponses] = useState<TaskResponseDetail[]>([]);
  const [selectedTaskResponse, setSelectedTaskResponse] =
    useState<TaskResponseDetail>();

  useEffect(() => {
    const getTaskResponses = async () => {
      if (task) {
        const response = await fetch(
          `/api/classes/0/tasks/${task.id}/responses/`
        );
        if (response.ok) {
          const reponseData = await response.json();
          setTaskResponses(reponseData);
        }
      }
    };
    getTaskResponses();
  }, [task]);

  return (
    <div className="w-1/4">
      <div className="bg-neutral-200 text-center p-1 border-r-2 border-gray-400">
        <span className="font-bold">Task Responses</span>
      </div>
      <div className="p-2">
        {taskResponses.map((taskResponse) => (
          <div
            key={taskResponse.student.id}
            className={`rounded-md my-1 cursor-pointer ${
              selectedTaskResponse?.student.id === taskResponse.student.id &&
              "bg-yellow-300"
            }`}
            onClick={() => {
              onResponseSelect(taskResponse);
              setSelectedTaskResponse(taskResponse);
            }}
          >
            <Card>
              <Flex gap="3" align="center">
                <Box>
                  <Text as="div" size="2" weight="bold">
                    {taskResponse.student.name}
                  </Text>
                  <Text as="div" size="1" color="gray">
                    Submitted: {taskResponse.isSubmitted}
                  </Text>
                </Box>
              </Flex>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskResponses;
