import { PublicLogoClass } from "@/components/class/ClassCard";
import { Task } from "@prisma/client";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";

const TaskPanel = ({
  logoClass,
  onTaskSelect,
}: {
  logoClass?: PublicLogoClass;
  onTaskSelect: (task: Task) => void;
}) => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [creatingTask, setCreatingTask] = useState(false);

  //TODO: Fetch all the tasks

  useEffect(() => {
    const getTasks = async () => {
      if (logoClass) {
        const response = await fetch(`/api/classes/${logoClass.id}/tasks`);
        if (response.status === 200) {
          const data = await response.json();
          setTasks(data);
        }
      }
    };
    getTasks();
  }, [logoClass]);

  if (!session) {
    return <div>You are not logged in</div>;
  }

  const isAdmin =
    session.user_id === logoClass?.instructor.id ||
    (logoClass?.assistantInstructor
      ? session.user_id === logoClass?.assistantInstructor.id
      : false);

  return (
    <div className="w-1/4">
      <div className="bg-neutral-200 text-center p-1 border-r-2 border-gray-400">
        <span className="font-bold">Tasks</span>
      </div>
      <div>
        {isAdmin && (
          <Button onClick={() => setCreatingTask(true)}>Create Task</Button>
        )}
      </div>
      {!logoClass && <div className="p-2 text-gray-800">Select a class</div>}
      {tasks.map((task) => (
        <div
          key={task.id}
          className="p-2 bg-gray-100 rounded-md my-1 cursor-pointer"
          onClick={() => {
            onTaskSelect(task);
          }}
        >
          <div className="font-semibold">{task.question}</div>
          <div className="text-xs">{task.createdAt.toLocaleString()}</div>
        </div>
      ))}
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
