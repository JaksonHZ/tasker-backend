import { FastifyRequest, FastifyReply } from "fastify";
import zod from "zod";
import { makeAuthenticateUseCase } from "../../../use-cases/factories/make-authenticate-usecase";
export async function authenticateUser(request: FastifyRequest, reply: FastifyReply) {

  const bodySchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
  });

  const { email, password } = bodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({ email, password });

    const accessToken = await reply.jwtSign({ email: user.email }, {sign: { sub: user.id}});
    const refreshToken = await reply.jwtSign({ email: user.email }, {sign: { sub: user.id, expiresIn: '7d'}});

    return reply.status(200).send({
      accessToken,
      refreshToken
    });

  } catch {
    return reply.code(401).send({ message: "invalid Credentials" });
  }
}