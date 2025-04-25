import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // // Remplace ceci avec ta logique d'auth avec le fecth
        if (
          credentials?.email === "admin@site.com" &&
          credentials?.password === "admin"
        ) {
          return {
            id: "1",
            name: "Admin",
            email: "admin@site.com",
            role: "[ROLE_ADMIN]",
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;

      return token;
    },
    async session({ session, token }) {
      if (token?.user) session.user = token.user as User;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
