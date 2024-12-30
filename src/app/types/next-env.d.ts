import { DefaultSession, DefaultUser } from "next-auth";

// Extend the default User type
declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string;
    id?: string;
  }

  interface Session {
    user: {
      role?: string;
      id?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    role?: string;
  }
}
