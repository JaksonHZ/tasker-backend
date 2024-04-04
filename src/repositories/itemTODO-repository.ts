import { User, ItemTODO } from "@prisma/client";

export interface ItemTodoRepository {
  create(title: string, listTodoID: string, orderNumber: number, description?: string): Promise<ItemTODO>;
  update(id: string, title: string, description?: string, categoryID?: string): Promise<ItemTODO>;
  changeList(id: string, listTodoID: string): Promise<void>;
  delete(id: string): Promise<void>;
}