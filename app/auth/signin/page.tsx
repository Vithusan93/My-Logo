"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Theme } from "@radix-ui/themes";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const userSignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type signinType = z.infer<typeof userSignInSchema>;

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signinType>({ resolver: zodResolver(userSignInSchema) });

  const router = useRouter();
  const { data: session, status } = useSession();

  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      setError("Invalid credentials");
    }
    console.log(searchParams);
  }, []);
  if (status === "loading") {
    return (
      <Theme appearance="dark">
        <div className="">
          <div className="">
            <section className="bg-neutral-800">
              <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                  <div className="font-medium bg-gray-100 px-2 py-1 rounded-md text-gray-800">
                    THE <span className="font-bold">LOGO</span> GAME
                  </div>
                </div>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-neutral-900 dark:border-neutral-900">
                  LOADING
                </div>
              </div>
            </section>
          </div>
        </div>
      </Theme>
    );
  } else if (session) {
    router.push("/console");
  }
  return (
    <Theme appearance="dark">
      <div className="">
        <div className="">
          <section className="bg-neutral-800">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <div className="font-medium bg-gray-100 px-2 py-1 rounded-md text-gray-800">
                  THE <span className="font-bold">LOGO</span> GAME
                </div>
              </div>
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-neutral-900 dark:border-neutral-900">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign In
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleSubmit(async (data) => {
                      signIn("credentials", {
                        email: data.email,
                        password: data.password,
                      });
                    })}
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                      />
                      {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        {...register("password")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.password && (
                        <p className="text-red-500">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    {error && (
                      <Callout.Root color="red">
                        <Callout.Text>{error}</Callout.Text>
                      </Callout.Root>
                    )}
                    <Button
                      type="submit"
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Sign In
                    </Button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      No have account?
                      <a
                        href="/auth/signup"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Sign Up
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Theme>
  );
};

export default SignIn;
