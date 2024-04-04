import { FastifyInstance } from "fastify";
import { registerUser } from "./register";
import { authenticateUser } from "./authenticate";
import { getLists } from "./getLists";
import { verifyJWT } from "../../middlewares/verify-jwt";
export async function userRoutes(app: FastifyInstance) {
  app.get("/user", async (request, reply) => {
    console.log("GET /user");
  });

  app.post("/register", registerUser)

  app.post("/authenticate", authenticateUser)

  app.get("/user/list", {onRequest: [verifyJWT]} , getLists)
}