import { FastifyInstance } from "fastify"
import UserController from "../modules/User/controller/user.controller"
import { createUserSchema } from "../modules/User/schemas/createUser"

export async function userRoutes(app: FastifyInstance) {
  app.post('/create', { schema: createUserSchema }, (req, rep) => {
    return req.diScope.resolve<UserController>('userController').create(req, rep)
  })
}
