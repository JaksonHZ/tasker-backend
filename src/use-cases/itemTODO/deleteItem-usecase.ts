import { ItemTodoRepository } from "../../repositories/itemTODO-repository";

interface deleteItemUseCaseRequest {
  id: string, 
}

export class DeleteItemUseCase {
  constructor(
    private itemTODORepository: ItemTodoRepository,
  ){}

  async execute({id}: deleteItemUseCaseRequest) {

    const itemTODO = await this.itemTODORepository.findById(id);

    if (!itemTODO) {
      throw new Error('Item not found');
    }


    await this.itemTODORepository.delete(id);

    return;
  }
}