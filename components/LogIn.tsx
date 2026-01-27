"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "@/lib/actions";
import { logInFormSchema, logInFormType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

function LogInPage() {
  const [pending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<logInFormType>({
    resolver: zodResolver(logInFormSchema),
  });
  const onSubmit = (data: logInFormType) => {
    startTransition(async () => {
      const res = await loginAction(data);
      if (res) {
        setError("root", { message: res });
        return;
      }
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button asChild variant="link">
              <Link href={"/register"}>Sign Up</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" form="login-form" className="w-full">
            {pending ? "Logging in" : "log In"}
          </Button>
          <div className="flex items-center justify-center space-x-1.5">
            <Button variant="outline" className="w-full">
              Google
            </Button>
            <Button variant="outline" className="w-full">
              Github
            </Button>
          </div>
        </CardFooter>

        {errors.root && (
          <p className="text-xs text-red-500 text-center">
            {errors.root.message}
          </p>
        )}
      </Card>
    </div>
  );
}

export default LogInPage;
