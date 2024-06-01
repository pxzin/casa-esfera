import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserRepositoryImpl } from "@/infrastructure/data/repositories/UserRepositoryImpl";
import { SignInUseCase } from "@/application/use_cases/auth/SignInUseCase";
import connectDB from "@/infrastructure/data/db";

connectDB();

const userRepository = new UserRepositoryImpl();
const signInUseCase = new SignInUseCase(userRepository);

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }
        const user = await signInUseCase.execute(
          credentials.username,
          credentials.password
        );
        if (user) {
          return { id: user.id, name: user.name, email: user.email };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: undefined,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
