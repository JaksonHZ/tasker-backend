import { FastifyRequest, FastifyReply } from 'fastify';
import zod from 'zod';
import { makeUpdateListUseCase } from '../../../use-cases/factories/make-updateList-usecase';
import { ResourceNotFound } from '../../../use-cases/errors/list-not-found';
export async function updateList(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = zod.object({
    title: zod.string(),
    id: zod.string(),
  });

  const { title, id } = bodySchema.parse(request.body);

  try {
    const updateListUseCase = makeUpdateListUseCase();

    await updateListUseCase.execute({ title, id });

    return reply.status(200).send();

  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.code(404).send({ message: error.message });
    }

    throw error;
  }
}