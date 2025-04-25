import NextAuth, { DefaultSession } from "next-auth";

// Définition du type pour User
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Étendre le type global de la session pour inclure `user` personnalisé
declare module "next-auth" {
  interface Session {
    user: User;
  }
}
