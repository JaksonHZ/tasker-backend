import { FastifyRequest, FastifyReply } from 'fastify';
import zod from 'zod';
import { makeCreateItemUseCase } from '../../../use-cases/factories/make-createItem-usecase';

export async function createItem(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = zod.object({
    title: zod.string(),
    listTODOId: zod.string(),
    order: zod.number(),
    description: zod.string().optional(), 
    categoryId: zod.string().optional()
  });

  const { title, listTODOId, order, description, categoryId } = bodySchema.parse(request.body);

  try {
    const createItemUseCase = makeCreateItemUseCase();

    await createItemUseCase.execute({ title, listTODOId, order, description, categoryId});

    return reply.status(201).send();

  } catch (error) {
    return reply.code(500).send({ message: "error" });
  }
}