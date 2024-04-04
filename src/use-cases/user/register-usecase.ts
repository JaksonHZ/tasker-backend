import { User } from "@prisma/client";
import { UserRepository } from "../../repositories/users-repository";
import { Hash } from "../../cryptography/hash";

interface RegisterUseCaseRequest {
  username: string;
  password: string;
  email: string;
}

interface RegisterUseCaseResponse {
  user : User;
}

export class RegisterUseCase {

  constructor(
    private usersRepository: UserRepository,
    private hash: Hash
  ) {}

  async execute({username, password, email}: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findUniqueEmail(email);

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const passwordHash = await this.hash.generator(password);

    const user = await this.usersRepository.create(username, passwordHash, email);

    return {
      user
    };
  }
}