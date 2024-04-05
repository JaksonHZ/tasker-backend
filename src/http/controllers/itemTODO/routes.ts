import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { createItem } from "./createItem";
import { updateItem } from "./updateItem";
import { changeList } from "./changeList";
export async function itemTODORoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);
  app.post("/createitem", createItem);
  app.put("/updateitem", updateItem);
  app.put("/changelist", changeList);
}