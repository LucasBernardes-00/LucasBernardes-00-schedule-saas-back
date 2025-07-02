import { Type } from "@sinclair/typebox";
import { ResponseStatus } from "../../../shared/enum/responseStatus.enum";

export const LoginSuccessResponse = Type.Object({
  status: Type.Literal(ResponseStatus.SUCCESS),
  token: Type.String()
})

export const LoginErrorResponse = Type.Object({
  status: Type.Literal(ResponseStatus.FAILED),
  errors: Type.Array(Type.String())
})
