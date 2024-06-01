import { RegisterUseCase } from "@/application/use_cases/auth/RegisterUseCase";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { User } from "@/domain/entities/User";

describe("RegisterUseCase", () => {
  let registerUseCase: RegisterUseCase;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
      comparePassword: jest.fn(),
    };

    registerUseCase = new RegisterUseCase(mockUserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should register a new user", async () => {
    const newUser: User = {
      id: "",
      name: "Test",
      email: "test@example.com",
      password: "password",
    };
    mockUserRepository.findByEmail.mockResolvedValue(null); // Mock findByEmail to return null

    await registerUseCase.execute(newUser);

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      "test@example.com"
    );
    expect(mockUserRepository.save).toHaveBeenCalledWith(newUser);
  });

  test("should throw an error if the user already exists", async () => {
    const existingUser: User = {
      id: "1",
      name: "Test",
      email: "test@example.com",
      password: "password",
    };
    mockUserRepository.findByEmail.mockResolvedValue(existingUser); // Mock findByEmail to return existing user

    await expect(registerUseCase.execute(existingUser)).rejects.toThrow(
      "User already exists"
    );

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      "test@example.com"
    );
    expect(mockUserRepository.save).not.toHaveBeenCalled();
  });
});
