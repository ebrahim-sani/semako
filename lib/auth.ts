import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
   session: {
      strategy: "jwt",
   },
   providers: [
      CredentialsProvider({
         name: "Sign in",
         credentials: {
            email_address: {
               label: "Email",
               type: "text",
            },
            password: {
               label: "Password",
               type: "password",
            },
         },
         async authorize(credentials) {
            if (!credentials?.email_address || !credentials?.password) {
               return null;
            }

            const member = await prisma.member.findUnique({
               where: {
                  email: credentials.email_address,
               },
            });

            if (!member) {
               return null;
            }

            const isPasswordValid = await compare(
               credentials.password,
               member.password,
            );

            if (!isPasswordValid) {
               return null;
            }

            return member;
         },
      }),
   ],

   callbacks: {
      session: async ({ session, token }) => {
         if (token && typeof token.id === "string") {
            const member = await prisma.member.findUnique({
               where: {
                  id: token.id,
               },
               include: { enrollments: true, transactions: true },
            });

            if (member) {
               session.user = member;
            }
         }
         return session;
      },

      jwt: ({ token, user }) => {
         if (user) {
            const u = user as unknown as any;

            // Set the expiration time to 1 hours from now (in seconds)
            const expires = Math.floor(Date.now() / 1000) + 1 * 60 * 60;

            return {
               ...token,
               id: u.id,
               exp: expires,
            };
         }
         return token;
      },
   },
   pages: {
      signIn: "/auth/signin",
   },
};
