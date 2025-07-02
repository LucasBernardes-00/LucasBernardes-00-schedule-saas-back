import { Type } from '@sinclair/typebox'
import { ResponseStatus } from '../../../shared/enum/responseStatus.enum'

export const CreateUserSuccessResponse = Type.Object({
  status: Type.Literal(ResponseStatus.SUCCESS),
  id: Type.String()
})

export const CreateUserErrorResponse = Type.Object({
  status: Type.Literal(ResponseStatus.FAILED),
  erros: Type.Array(Type.String())
})
