import { FastifyRequest, FastifyReply } from 'fastify';
import zod from 'zod';
import { makeDeleteItemUseCase } from '../../../use-cases/factories/make-deleteItem-usecase';

export async function deleteItem(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = zod.object({
    id: zod.string(),
  });

  const { id } = bodySchema.parse(request.params);

  try {
    const deleteItemUseCase = makeDeleteItemUseCase();

    await deleteItemUseCase.execute({ id });

    return reply.status(200).send();

  } catch (error) {
    console.error(error)
    return reply.code(500).send({ message: "error" });
  }
}