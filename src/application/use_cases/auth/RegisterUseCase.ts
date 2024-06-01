import { UserRepository } from "@/domain/repositories/UserRepository";
import { User } from "@/domain/entities/User";

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      throw new Error("User already exists");
    }
    await this.userRepository.save(user);
  }
}
