import { Type } from '@sinclair/typebox'

export const CreateUserInput = Type.Object({
  name: Type.String(),
  username: Type.String(),
  email: Type.String(),
  password: Type.String()
})