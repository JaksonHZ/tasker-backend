import { User, ItemTODO } from "@prisma/client";

export interface ItemTodoRepository {
  create(title: string, listTODOId: string, order: number, description?: string, categoryId?: string): Promise<ItemTODO>;
  update(id: string, title: string, description?: string, categoryId?: string): Promise<void>;
  updateOrder(id: string, order: number): Promise<void>;
  changeList(id: string, listTODOId: string): Promise<void>;
  delete(id: string): Promise<void>;
}