import { FastifyInstance } from "fastify";
import AuthController from "../modules/Auth/controller/auth.controller"
import { loginSchema } from "../modules/Auth/schemas/login"

export async function authRoutes(app: FastifyInstance) { 
  app.post('/login', { schema: loginSchema }, async (req, rep) => {
    return req.diScope.resolve<AuthController>('authController').login(req, rep)
  })
}
