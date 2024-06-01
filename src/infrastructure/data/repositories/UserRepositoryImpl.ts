import bcrypt from "bcrypt";
import UserModel from "@/infrastructure/data/models/User";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { User } from "@/domain/entities/User";

export class UserRepositoryImpl implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ email }).exec();
    if (!userDoc) return null;
    return {
      id: userDoc._id as unknown as string,
      name: userDoc.name,
      email: userDoc.email,
      password: userDoc.password,
    };
  }

  async save(user: User): Promise<void> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new UserModel({
      name: user.name,
      email: user.email,
      password: hashedPassword,
    });
    await newUser.save();
  }

  async comparePassword(
    inputPassword: string,
    storedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(inputPassword, storedPassword);
  }
}
