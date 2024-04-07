import { ListTodoRepository } from "../../repositories/listTODO-repository";

interface DeleteListUseCaseRequest {
  id: string;
}

export class DeleteListUseCase {
  constructor(
    private listTODORepository: ListTodoRepository,
  ){}

  async execute({id}: DeleteListUseCaseRequest) {

    const list = await this.listTODORepository.findById(id)

    if (!list) {
      throw new Error('List not found');
    }

    await this.listTODORepository.delete(id)

    return;
  }
}