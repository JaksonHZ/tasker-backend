import { FastifyRequest, FastifyReply } from 'fastify';
import zod from 'zod';
import { makeDeleteListUseCase } from '../../../use-cases/factories/make-deleteList-usecase';
export async function deleteList(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = zod.object({
    id: zod.string(),
  });

  const { id } = bodySchema.parse(request.body);

  try {
    const deleteListUseCase = makeDeleteListUseCase();

    await deleteListUseCase.execute({ id });

    return reply.status(201).send();

  } catch (error) {
    return reply.code(500).send({ message: "error" });
  }
}