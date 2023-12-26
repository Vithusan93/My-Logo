import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@radix-ui/themes";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { classCreationSchema } from "../api/classes/classSchema";

type creationType = z.infer<typeof classCreationSchema>;

const LogoClassForm = () => {
  const { register, handleSubmit } = useForm<creationType>({
    resolver: zodResolver(classCreationSchema),
  });
  return (
    <div className="">
      <form
        onSubmit={handleSubmit(async (data) => {
          // TODO: validation
          console.log(data);
          const response = await fetch("/api/classes/", {
            method: "POST",
            body: JSON.stringify(data),
          });
          console.log(response);
        })}
      >
        <TextField.Input
          {...register("name")}
          placeholder="Class Name"
        ></TextField.Input>
        <TextField.Input
          {...register("password")}
          placeholder="Password for joining"
        ></TextField.Input>
        <div className="py-2 w-full">
          <Button className="w-full">Create Class</Button>
        </div>
      </form>
    </div>
  );
};

export default LogoClassForm;
