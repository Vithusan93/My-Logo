import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        if (!credentials) {
          return null;
        }

        try {
          const unsafeUser = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          if (unsafeUser) {
            const user = {
              id: unsafeUser.id.toString(),
              name: unsafeUser.name,
              email: unsafeUser.email,
            };
            const passwordMatch = await bcrypt.compare(
              credentials.password,
              unsafeUser.password
            );
            if (passwordMatch) {
              return user;
            }

            return null;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user_id = parseInt(user.id);
      }
      return token;
    },
    async session({ session, token }) {
      session.user_id = token.user_id;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
