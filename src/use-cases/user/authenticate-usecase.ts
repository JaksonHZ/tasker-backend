import { User } from "@prisma/client";
import { Hash } from "../../cryptography/hash";
import { UserRepository } from "../../repositories/users-repository";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(
    private usersRepository: UserRepository,
    private hash: Hash,
    ) {}

  async execute({email, password}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findUniqueEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const passwordMatch = await this.hash.compare(password, user.passwordHash);

    if (!passwordMatch) {
      throw new Error('Password does not match');
    }

    return {
      user
    }
  }
}

