import { FastifyRequest, FastifyReply } from 'fastify';
import zod from 'zod';
import { makeRegisterUseCase } from '../../../use-cases/factories/make-register-usecase';
export async function registerUser(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = zod.object({
    email: zod.string().email(),
    username: zod.string().min(3),
    password: zod.string().min(6),
  });

  const { email, username, password } = bodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({ email, username, password });

    return reply.status(201).send();

  } catch (error) {
    return reply.code(500).send({ message: "error" });
  }
}