import React from "react";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { PublicLogoClass } from "@/components/class/ClassCard";
import { Task } from "@prisma/client";
import { useForm } from "react-hook-form";
import { taskSchema } from "@/app/api/classes/[id]/tasks/taskSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type createTaskType = z.infer<typeof taskSchema>;

const TaskForm = ({
  logoClass,
  creatingTask,
  setCreatingTask,
  onSuccess,
}: {
  logoClass: PublicLogoClass;
  creatingTask: boolean;
  setCreatingTask: (creatingTask: boolean) => void;
  onSuccess: (task: Task) => void;
}) => {
  const createTask = async (data: createTaskType) => {
    console.log("task creation");

    const response = await fetch(`/api/classes/${logoClass.id}/tasks`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (response.status === 201) {
      const responseData = await response.json();
      onSuccess(responseData);
      setCreatingTask(false);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createTaskType>({
    resolver: zodResolver(taskSchema),
  });

  return (
    <div>
      <Dialog.Root open={creatingTask} onOpenChange={setCreatingTask}>
        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Create Task for {logoClass.name}</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            With question and optional script to complete
          </Dialog.Description>
          <form
            onSubmit={handleSubmit(async (data) => {
              createTask(data);
            })}
          >
            <Flex direction="column" gap="3">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Question
                </Text>
                <TextField.Input {...register("question")} />
                {errors.question && <p>{errors.question.message}</p>}
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Script (optional)
                </Text>
                <TextField.Input {...register("script")} type="" />
                {errors.script && <p>{errors.script.message}</p>}
              </label>
              <Button>Create</Button>
            </Flex>
          </form>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default TaskForm;
