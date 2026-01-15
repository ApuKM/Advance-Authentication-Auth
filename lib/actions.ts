"use server";

import { prisma } from "./prisma";
import { RegisterType } from "./types";
import bcrypt from "bcrypt";

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
}
