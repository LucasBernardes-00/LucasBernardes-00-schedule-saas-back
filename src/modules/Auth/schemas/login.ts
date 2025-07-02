import { LoginInput } from "./loginInput"
import { LoginErrorResponse, LoginSuccessResponse } from "./loginResponse"

const loginSchema = {
  tags: ['Auth'],
  summary: 'User Login',
  description: 'This endpoint allows users to log in to the system.',
  body: LoginInput,
  response: {
    200: LoginSuccessResponse,
    400: LoginErrorResponse
  }
}

export { loginSchema }
