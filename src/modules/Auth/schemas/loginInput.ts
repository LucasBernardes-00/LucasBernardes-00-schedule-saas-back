import { Type } from "@sinclair/typebox";

export const LoginInput = Type.Object({
  username: Type.String(),
  password: Type.String(),
  rememberMe: Type.Boolean({ default: false })
})
