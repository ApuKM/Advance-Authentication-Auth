import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import authConfig from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { logInFormSchema } from "./lib/types";
import bcrypt from "bcrypt";

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
    Credentials({
      authorize: async (credentials) => {
        try {
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
