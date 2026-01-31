import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import authConfig from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { logInFormSchema } from "./types/types";
import bcrypt from "bcrypt";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

async function getUser(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    }),
    Credentials({
      authorize: async (credentials) => {
        try {
          // console.log("CREDENTIALS:", credentials);
          const parsedCredentials = logInFormSchema.safeParse(credentials);
          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email);
            if (!user || !user.password) return null;
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) return null;
            return user;
          }
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
        return null;
      },
    }),
  ],
});
