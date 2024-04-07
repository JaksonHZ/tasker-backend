import { ListTodoRepository } from "../../repositories/listTODO-repository";
import { ItemTodoRepository } from "../../repositories/itemTODO-repository";

interface createItemUseCaseRequest {
  title: string,
  listTODOId: string, 
  order: number, 
  description?: string, 
  categoryId?: string
}

export class CreateItemUseCase {
  constructor(
    private itemTODORepository: ItemTodoRepository,
    private listTODORepository: ListTodoRepository
  ){}

  async execute({title, listTODOId, order, description, categoryId}: createItemUseCaseRequest) {
    const list = await this.listTODORepository.findById(listTODOId);

    if (!list) {
      throw new Error('List not found');
    }

    await this.itemTODORepository.create(title, listTODOId, order, description, categoryId);

    return;
  }
}