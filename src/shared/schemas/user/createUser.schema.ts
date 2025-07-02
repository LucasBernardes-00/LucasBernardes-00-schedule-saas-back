import { Type } from "@sinclair/typebox"
import { ResponseStatus } from "../../enum/responseStatus.enum"

const createUserSchema = {
  tags: ['User'],
  summary: 'Create a new user',
  description: 'This endpoint allows you to create a new user in the system.',
  body: Type.Object({
    name: Type.String(),
    username: Type.String(),
    email: Type.String(),
    password: Type.String()
  }),
  response: {
    201: Type.Object({
      status: Type.String({ enum: [ResponseStatus.SUCCESS] }),
      id: Type.String(),
    }),
    400: Type.Object({
      status: Type.String({ enum: [ResponseStatus.FAILED] }),
      erros: Type.Array(Type.String()),
    })
  }
}

export { createUserSchema }
