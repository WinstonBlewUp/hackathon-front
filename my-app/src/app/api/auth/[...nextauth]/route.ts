import { login } from "@/lib/axios";
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
        console.error("Tentative de connexion", credentials);

        try {
          console.log("Réponse du serveur:");

          const response = await login({
            email: credentials?.email ?? "",
            password: credentials?.password ?? "",
          });
          console.log(response);
          // Vérification de la réponse
          if (response.success && response.data) {
            return {
              id: response.data.id,
              email: response.data.email,
              name: response.data.name,
              role: Array.isArray(response.data.role)
                ? response.data.role[0]
                : response.data.role,
            };
          } else {
            return null; // Retourne null en cas d'erreur
          }
        } catch (err) {
          console.error("Erreur de connexion", err);
          return null; // Retourne null en cas d'exception
        }
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
