import { PublicLogoClass } from "@/components/class/ClassCard";
import { Task, TaskResponse } from "@prisma/client";
import { Badge, Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import TaskForm from "./TaskForm";

interface TaskWithResponse extends Task {
  StudentTask: TaskResponse[];
}

const TaskPanel = ({
  logoClass,
  onTaskSelect,
  isAdmin,
}: {
  logoClass?: PublicLogoClass;
  onTaskSelect: (task: Task) => void;
  isAdmin: boolean;
}) => {
  const [tasks, setTasks] = useState<TaskWithResponse[]>([]);
  const [selectedTask, setSelectedTask] = useState<TaskWithResponse>();
  const [creatingTask, setCreatingTask] = useState(false);

  //TODO: Fetch all the tasks

  useEffect(() => {
    const getTasks = async () => {
      if (logoClass) {
        const response = await fetch(`/api/classes/${logoClass.id}/tasks`);
        if (response.status === 200) {
          const data = await response.json();
          console.log(data);

          setTasks(data);
        }
      }
    };
    getTasks();
  }, [logoClass]);

  return (
    <div className="w-1/4">
      <div className="bg-neutral-200 text-center p-1 border-r-2 border-gray-400">
        <span className="font-bold">Tasks</span>
      </div>
      <div className="w-full p-2">
        {isAdmin && (
          <Button
            className="w-full"
            variant="surface"
            onClick={() => setCreatingTask(true)}
          >
            <IoMdAddCircleOutline />
            Create Task
          </Button>
        )}
      </div>
      {!logoClass && <div className="p-2 text-gray-800">Select a class</div>}
      <div className="p-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`rounded-md my-1 cursor-pointer ${
              selectedTask?.id === task.id && "bg-yellow-300"
            }`}
            onClick={() => {
              onTaskSelect(task);
              setSelectedTask(task);
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
                  {task.StudentTask && task.StudentTask.length > 0 ? (
                    <>
                      <Flex gap="3" align="center">
                        <Text as="div" size="1" color="gray">
                          {task.StudentTask[0].isSubmitted ? (
                            <Badge color="green">Submitted</Badge>
                          ) : (
                            <Badge>In Progress</Badge>
                          )}
                        </Text>
                        <Text as="div" size="1" color="gray">
                          {task.StudentTask[0].points ? (
                            <Badge color="blue">
                              POINTS: {task.StudentTask[0].points}
                            </Badge>
                          ) : (
                            <Badge>Not Graded</Badge>
                          )}
                        </Text>
                      </Flex>
                    </>
                  ) : (
                    "Not Answered"
                  )}
                </Box>
              </Flex>
            </Card>
          </div>
        ))}
      </div>
      {logoClass && (
        <TaskForm
          logoClass={logoClass}
          creatingTask={creatingTask}
          setCreatingTask={setCreatingTask}
          onSuccess={(task) => {
            const taskList = [...tasks];
            taskList.push(task);
            setTasks(taskList);
          }}
        />
      )}
    </div>
  );
};

export default TaskPanel;
