import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma  from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import { verifyUser } from '@/server/auth/auth.service';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" } 
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await verifyUser(
          credentials.email as string,
          credentials.password as string
        );

        if (!user) return null;

        return {
          id: user.id,
          email: user.email,
        };
      } 
    }),
  ],
})
