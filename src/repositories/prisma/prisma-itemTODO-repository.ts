import { ItemTodoRepository } from "../itemTODO-repository";
import { prisma } from "../../lib/prisma";

export class PrismaItemTodoRepository implements ItemTodoRepository {
  
  async create(title: string, listTODOId: string, order: number, description?: string | undefined, categoryId?: string | undefined){
    const itemTODO = await prisma.itemTODO.create({
      data: {
        title,
        listTODOId,
        order,
        description,
        done: false,
        categoryId
      }
    });

    return itemTODO;
  }

  async update(id: string, title: string, description?: string, categoryId?: string){
    throw new Error("Method not implemented.");
  }
  async updateOrder(id: string, order: number) {
    throw new Error("Method not implemented.");
  }
  async changeList(id: string, listTODOId: string){
    throw new Error("Method not implemented.");
  }
  async delete(id: string){
    throw new Error("Method not implemented.");
  }
  
}