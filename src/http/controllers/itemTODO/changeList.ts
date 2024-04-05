import { FastifyRequest, FastifyReply } from 'fastify';
import zod from 'zod';
import { makeChangeListUseCase } from '../../../use-cases/factories/make-changeList-usecase';

export async function changeList(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = zod.object({
    listTODOId: zod.string(),
    items: zod.array(zod.object({
      itemId: zod.string(),
      order: zod.number()
    }))
  });

  const { listTODOId, items } = bodySchema.parse(request.body);

  try {
    
    const changeListUseCase = makeChangeListUseCase();

    await changeListUseCase.execute({ listTODOId, items});

    return reply.status(200).send();

  } catch (error) {
    console.error(error)
    return reply.code(500).send({ message: "error" });
  }
}