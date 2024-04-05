import { FastifyRequest, FastifyReply } from 'fastify';
import zod from 'zod';
import { makeUpdateListUseCase } from '../../../use-cases/factories/make-updateList-usecase';
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
    return reply.code(500).send({ message: "error" });
  }
}