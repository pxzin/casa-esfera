import { UserRepository } from "@/domain/repositories/UserRepository";
import { User } from "@/domain/entities/User";

export class RegisterUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: User): Promise<void> {
    await this.userRepository.save(user);
  }
}
