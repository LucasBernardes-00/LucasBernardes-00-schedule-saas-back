import { CreateUserInput } from "./createUserInput"
import { CreateUserErrorResponse, CreateUserSuccessResponse } from "./createUserResponse"

const createUserSchema = {
  tags: ['User'],
  summary: 'Create a new user',
  description: 'This endpoint allows you to create a new user in the system.',
  body: CreateUserInput,
  response: {
    201: CreateUserSuccessResponse,
    400: CreateUserErrorResponse
  }
}

export { createUserSchema }

