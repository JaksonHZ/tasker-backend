import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { createItem } from "./createItem";
export async function itemTODORoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);
  app.post("/createitem", createItem);
}