"use server";

import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { logInFormType, RegisterType } from "./types";
import bcrypt from "bcrypt";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function registerAction(data: RegisterType) {
  const { name, email, password } = data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      error: "Email already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      password: hashedPassword,
      email,
    },
  });
  redirect("/home");
}


export async function loginAction(data: logInFormType){
  try {
    await signIn("credentials", data);
  } catch (error) {
   if(error instanceof AuthError){
    switch (error.type){
      case "CredentialsSignin":
        return "Invalid credentials.";
      default: 
       return "Something went wrong!"
    }
   }
   throw error;
  }
}
