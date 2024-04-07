import { FastifyRequest, FastifyReply } from 'fastify';
import zod from 'zod';
import { makeDeleteListUseCase } from '../../../use-cases/factories/make-deleteList-usecase';
export async function deleteList(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = zod.object({
    id: zod.string(),
  });

  const { id } = bodySchema.parse(request.params);

  try {
    const deleteListUseCase = makeDeleteListUseCase();

    await deleteListUseCase.execute({ id });

    return reply.status(200).send();

  } catch (error) {
    console.error(error)
    return reply.code(500).send({ message: "error" });
  }
}