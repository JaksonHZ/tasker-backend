import { ListTodoRepository } from "../../repositories/listTODO-repository";
import { UserRepository } from "../../repositories/users-repository";

interface UpdateOrderListUseCaseRequest {
  id: string;
  orderNumber: number;
}

export class UpdateOrderListUseCase {
  constructor(
    private listTODORepository: ListTodoRepository,
  ){}

  async execute({id, orderNumber}: UpdateOrderListUseCaseRequest) {

    const list = await this.listTODORepository.findById(id)

    if (!list) {
      throw new Error('List not found');
    }

    await this.listTODORepository.updateOrderNumber(id, orderNumber);

    return;
  }
}