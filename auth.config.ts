import type { NextAuthConfig } from "next-auth";
import { findUserById } from "./lib/users";
import { prisma } from "./lib/prisma";

// Notice this is only an object, not a full Auth.js instance
export default {
  pages: {
    signIn: "/login",
  },
  events: {
    async linkAccount({user}){
      await prisma.user.update({
        where: {id: user.id},
        data: {emailVerified: new Date()}
      })
    }
  },
  callbacks: {
    // async signIn({ user }) {
    //   if (!user?.id) return false;
    //   const existingUser = await findUserById(user.id);
    //   if (!existingUser || !existingUser.emailVerified) return false;
    //   return true;
    // },

    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as "USER" | "ADMIN";
      }
      // console.log(session);
      return session;
    },
    async jwt({ token }) {
      // console.log(token)
      if (!token.sub) return token;
      const existingUser = await findUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role as "USER" | "ADMIN";
      return token;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
