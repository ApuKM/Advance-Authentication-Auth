"use server";

import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { logInFormType, RegisterType } from "../types/types";
import bcrypt from "bcrypt";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { findUserByEmail } from "./users";


export async function registerAction(data: RegisterType) {
  const { name, email, password } = data;

  const existingUser = await findUserByEmail(email);

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
      // Mark email as verified for this demo so users can sign in immediately
      emailVerified: true,
    },
  });
  redirect("/home");
}


export async function loginAction(data: logInFormType){
  try {
    // console.log(data);    
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    
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
