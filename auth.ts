import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"
import authConfig from "./auth.config"
import Google from "next-auth/providers/google"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {strategy: "jwt"},
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    })
  ],
})