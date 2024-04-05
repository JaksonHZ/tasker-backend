import { FastifyRequest, FastifyReply } from 'fastify';
import zod from 'zod';
import { makeUpdateItemUseCase } from '../../../use-cases/factories/make-updateItem-usecase';

export async function updateItem(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = zod.object({
    title: zod.string().optional(),
    description: zod.string().optional(), 
    categoryId: zod.string().optional(),
    done: zod.boolean().optional(),
    id: zod.string(),
  });

  const { id, title, categoryId, description, done } = bodySchema.parse(request.body);

  try {
    const updateItemUseCase = makeUpdateItemUseCase();

    await updateItemUseCase.execute({ id, title, categoryId, description, done});

    return reply.status(201).send();

  } catch (error) {
    return reply.code(500).send({ message: "error" });
  }
}