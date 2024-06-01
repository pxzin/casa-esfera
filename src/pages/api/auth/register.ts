import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/infrastructure/data/db";
import { UserRepositoryImpl } from "@/infrastructure/data/repositories/UserRepositoryImpl";
import { RegisterUseCase } from "@/application/use_cases/auth/RegisterUseCase";

connectDB();

const userRepository = new UserRepositoryImpl();
const registerUseCase = new RegisterUseCase(userRepository);

const registerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, email, password } = req.body;
    console.log("register", { name, email, password });
    try {
      await registerUseCase.execute({ id: "", name, email, password });
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Registration failed", error: error.message });
      } else {
        res
          .status(500)
          .json({ message: "Registration failed", error: String(error) });
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default registerHandler;
