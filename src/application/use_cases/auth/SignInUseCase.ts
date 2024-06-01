import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/repositories/UserRepository";

export class SignInUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (
      user &&
      (await this.userRepository.comparePassword(password, user.password))
    ) {
      return user;
    }
    return null;
  }
}
