import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@radix-ui/themes";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { classCreationSchema } from "../api/classes/classSchema";

type creationType = z.infer<typeof classCreationSchema>;

const LogoClassForm = () => {
  const { register, handleSubmit, reset } = useForm<creationType>({
    resolver: zodResolver(classCreationSchema),
  });

  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="text-center">
        <div>You are not connected. Sign in to create a class</div>
        <Button onClick={() => signIn()}>Sign In</Button>
      </div>
    );
  }
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
          if (response.status === 201) {
            reset();
          }
        })}
      >
        <TextField.Input
          {...register("name")}
          placeholder="Class Name"
        ></TextField.Input>
        <div className="py-2 w-full">
          <Button className="w-full">Create Class</Button>
        </div>
      </form>
    </div>
  );
};

export default LogoClassForm;
