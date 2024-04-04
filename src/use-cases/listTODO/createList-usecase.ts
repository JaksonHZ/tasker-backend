import { ListTodoRepository } from "../../repositories/listTODO-repository";
import { UserRepository } from "../../repositories/users-repository";

interface createListUseCaseRequest {
  title: string;
  userId: string;
  orderNumber: number;
}



export class CreateListUseCase {
  constructor(
    private listTODORepository: ListTodoRepository,
    private userRepository: UserRepository
  ){}

  async execute({title, userId, orderNumber}: createListUseCaseRequest) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    await this.listTODORepository.create(title, userId, orderNumber);

    return;
  }
}