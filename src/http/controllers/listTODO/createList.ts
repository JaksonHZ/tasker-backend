import { FastifyRequest, FastifyReply } from 'fastify';
import zod from 'zod';
import { makeCreateListUseCase } from '../../../use-cases/factories/make-createList-usecase';

export async function createList(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = zod.object({
    title: zod.string(),
    orderNumber: zod.number(),
  });

  const { title, orderNumber } = bodySchema.parse(request.body);

  try {
    const createListUseCase = makeCreateListUseCase();

    await createListUseCase.execute({ title, userId: request.user.sub , orderNumber });

    return reply.status(201).send();

  } catch (error) {
    return reply.code(500).send({ message: "error" });
  }
}