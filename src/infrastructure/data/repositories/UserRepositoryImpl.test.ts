import { UserRepositoryImpl } from "@/infrastructure/data/repositories/UserRepositoryImpl";
import UserModel, { UserDocument } from "@/infrastructure/data/models/User";
import bcrypt from "bcrypt";
import { Query } from "mongoose";

jest.mock("bcrypt");
jest.mock("@/infrastructure/data/models/User");

describe("UserRepositoryImpl", () => {
  let userRepository: UserRepositoryImpl;

  beforeEach(() => {
    userRepository = new UserRepositoryImpl();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should find user by email", async () => {
    const mockUser = {
      _id: "1",
      name: "Test",
      email: "test@example.com",
      password: "hashedPassword",
    };
    (UserModel.findOne as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockUser),
    } as unknown as Query<UserDocument, UserDocument>);

    const user = await userRepository.findByEmail("test@example.com");

    expect(user).toEqual({
      id: "1",
      name: "Test",
      email: "test@example.com",
      password: "hashedPassword",
    });
  });

  test("should save a new user", async () => {
    const mockUser = { save: jest.fn() };
    (UserModel as unknown as jest.Mock).mockReturnValue(mockUser);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");

    await userRepository.save({
      id: "",
      name: "Test",
      email: "test@example.com",
      password: "password",
    });

    expect(bcrypt.hash).toHaveBeenCalledWith("password", 10);
    expect(mockUser.save).toHaveBeenCalled();
    expect(UserModel).toHaveBeenCalledWith({
      name: "Test",
      email: "test@example.com",
      password: "hashedPassword",
    });
  });

  test("should compare passwords", async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await userRepository.comparePassword(
      "password",
      "hashedPassword"
    );

    expect(result).toBe(true);
    expect(bcrypt.compare).toHaveBeenCalledWith("password", "hashedPassword");
  });
});
