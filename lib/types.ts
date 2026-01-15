import * as z from "zod";

 export const registerFromSchema = z
  .object({
    name: z.string().min(2, "Username must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

  export type registerFromType = z.infer<typeof registerFromSchema>

  export type RegisterType = {
    name: string,
    email: string,
    password: string
  }