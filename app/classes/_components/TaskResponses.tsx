import { Task, TaskResponse } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";

const TaskResponses = ({ task }: { task?: Task }) => {
  const [taskResponses, setTaskResponses] = useState<TaskResponse[]>([]);
  const [selectedTaskResponse, setSelectedTaskResponse] =
    useState<TaskResponse>();
  useEffect(() => {
    const getTaskResponses = async () => {
      if (task) {
        const response = await fetch(
          `/api/classes/0/taskResponses/${task.id}/responses/`
        );
        if (response.ok) {
          const reponseData = await response.json();
          setTaskResponses(reponseData);
        }
      }
    };
    getTaskResponses();
  }, []);
  return (
    <div className="w-1/4">
      <div className="bg-neutral-200 text-center p-1 border-r-2 border-gray-400">
        <span className="font-bold">Task Responses</span>
      </div>
      <div className="p-2">
        {taskResponses.map((taskResponse) => (
          <div
            key={taskResponse.studentId}
            className={`rounded-md my-1 cursor-pointer ${
              selectedTaskResponse?.studentId === taskResponse.studentId &&
              "bg-yellow-300"
            }`}
            onClick={() => {
              ontaskResponseselect(task);
              setSelectedTaskResponse(task);
            }}
          >
            <Card>
              <Flex gap="3" align="center">
                <Box>
                  <Text as="div" size="2" weight="bold">
                    {task.question}
                  </Text>
                  <Text as="div" size="1" color="gray">
                    {task.createdAt.toLocaleString()}
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
