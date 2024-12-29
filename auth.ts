import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new Error("Please provide both email and password");
        }

        try {
          const response = await fetch("http://localhost:5000/api/getUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Authentication failed");
          }

          const user = await response.json();

          if (!user) {
            throw new Error("Sorry, user not found");
          }

          const userData = {
            ign: user.ign,
            email: user.email,
            role: user.role,
            id: user._id,
          };

          return userData;
        } catch (error: any) {
          console.error("Error in authorize function:", error);
          throw new Error(error.message || "Authorization failed");
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Add role to token
        // token.sub = user.id; // Add user ID to token
      }
      return token;
    },
    async session({ session, token }) {
      if (typeof token?.role === "string") {
        session.user.role = token.role; // Now it's guaranteed to be a string
      }
      return session;
    },
  },
});
