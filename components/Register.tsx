"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFromSchema, registerFromType } from "@/lib/types";
import { registerAction } from "@/lib/actions";
import { useTransition } from "react";

export function RegisterPage() {
  const [pending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<registerFromType>({
    resolver: zodResolver(registerFromSchema),
  });

  const onSubmit = (data: registerFromType) => {
    startTransition(async () => {
      const res = await registerAction(data);
      if (res?.error) {
        setError("email", { message: res.error });
        return;
      }
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Register your account</CardTitle>
          <CardDescription>
            Enter your username, email and password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="register-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="John Doe"
                  required
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>
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
                <Label htmlFor="password">Password</Label>
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
              <div className="grid gap-2">
                <Label htmlFor="confirmPass">Confirm Password</Label>
                <Input
                  id="confirmPass"
                  type="password"
                  required
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button disabled={pending}  form="register-form" type="submit" className="w-full">
           {pending ? "Creating account" : "Register"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
