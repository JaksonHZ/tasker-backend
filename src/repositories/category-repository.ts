import { User, Category } from "@prisma/client";

export interface CategoryTodoRepository {
  create(name: string, userID: string, color: string): Promise<Category>;
  update(id: string, name: string): Promise<Category>;
}