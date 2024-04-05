import { ListTodoRepository } from "../../repositories/listTODO-repository";
import { ItemTodoRepository } from "../../repositories/itemTODO-repository";

interface updateItemUseCaseRequest {
  id: string, 
  title?: string,
  description?: string, 
  categoryId?: string
  done?: boolean
}

export class UpdateItemUseCase {
  constructor(
    private itemTODORepository: ItemTodoRepository,
  ){}

  async execute({id, title, categoryId, description, done}: updateItemUseCaseRequest) {

    const itemTODO = await this.itemTODORepository.findById(id);

    if (!itemTODO) {
      throw new Error('Item not found');
    }

    await this.itemTODORepository.update(id, title, description, categoryId, done);

    return;
  }
}