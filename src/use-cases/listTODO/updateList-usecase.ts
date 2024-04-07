import { ListTodoRepository } from "../../repositories/listTODO-repository";
import { UserRepository } from "../../repositories/users-repository";

interface UpdateListUseCaseRequest {
  title: string;
  id: string;
}

export class UpdateListUseCase {
  constructor(
    private listTODORepository: ListTodoRepository,
  ){}

  async execute({title, id}: UpdateListUseCaseRequest) {

    const list = await this.listTODORepository.findById(id)

    if (!list) {
      throw new Error('List not found');
    }

    await this.listTODORepository.update(id, title)

    return;
  }
}