import { FastifyInstance } from "fastify";
import { createList } from "./createList";
import { app } from "../../../app";
import { verifyJWT } from "../../middlewares/verify-jwt";
export async function listTODORoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);
  app.post("/createlist" ,createList);
}