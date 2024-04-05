import { FastifyRequest, FastifyReply } from 'fastify';
import zod from 'zod';
import { makeUpdateOrderListUseCase } from '../../../use-cases/factories/make-updateOrderList-usecase';
export async function updateOrderList(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = zod.object({
    orderNumber: zod.number(),
    id: zod.string(),
  });

  const { orderNumber, id } = bodySchema.parse(request.body);

  try {
    const updateOrderListUseCase = makeUpdateOrderListUseCase();

    await updateOrderListUseCase.execute({ orderNumber, id });

    return reply.status(201).send();

  } catch (error) {
    return reply.code(500).send({ message: "error" });
  }
}