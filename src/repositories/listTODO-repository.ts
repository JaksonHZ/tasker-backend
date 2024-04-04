import { User, ListTODO } from "@prisma/client";

export interface ListTodoRepository {
  create(title: string, userId: string, orderNumber: number): Promise<ListTODO>;
  delete(id: string): Promise<void>;
  update(id: string, title: string): Promise<ListTODO>;
  updateOrderNumber(id: string, orderNumber: number): Promise<ListTODO>;
}