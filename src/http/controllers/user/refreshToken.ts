import { FastifyRequest, FastifyReply } from "fastify";

export async function refreshToken(request: FastifyRequest, reply: FastifyReply) {

  
  try {
    await request.jwtVerify();

    const accessToken = await reply.jwtSign({ email: request.user.email }, {sign: { sub: request.user.sub, expiresIn: '1h' }});
    const refreshToken = await reply.jwtSign({ email: request.user.email }, {sign: { sub: request.user.sub, expiresIn: '12h'}});

    return reply.status(200).send({
      accessToken,
      refreshToken
    });

  } catch {
    return reply.code(401).send({ message: "invalid Credentials" });
  }
}