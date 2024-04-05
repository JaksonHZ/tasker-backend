import { FastifyInstance } from "fastify";
import { createList } from "./createList";
import { app } from "../../../app";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { updateList } from "./updateList";
import { updateOrderList } from "./updateOrderList";
import { deleteList } from "./deleteList";
export async function listTODORoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);
  app.post("/createlist" ,createList);
  app.put("/updatelist", updateList);
  app.put("/updateorderlist", updateOrderList);
  app.delete("/deletelist", deleteList);
}