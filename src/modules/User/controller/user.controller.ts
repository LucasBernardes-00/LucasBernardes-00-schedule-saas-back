import { IErrorManager } from "../../../shared/contracts/core/internal/errorManager.interface"
import { ResponseStatus } from "../../../shared/enum/responseStatus.enum"
import { createUserSchema } from "../schemas/createUser"
import { FastifyReplyTypeBox } from "../../../shared/types.ts/fastify-reply.type"
import { FastifyRequestTypeBox } from "../../../shared/types.ts/fastify-request.type"
import { User } from "../entity/user"
import { CreateUserUseCase } from "../useCase/createUser.usecase"

class UserController {
  private readonly _errorManager: IErrorManager
  private readonly _createUserUseCase: CreateUserUseCase
  
  constructor(errorManager: IErrorManager, createUserUseCase: CreateUserUseCase) {
    this._errorManager = errorManager
    this._createUserUseCase = createUserUseCase
  }

  async signUp(
    req: FastifyRequestTypeBox<typeof createUserSchema>,
		rep: FastifyReplyTypeBox<typeof createUserSchema>,
  ) {
    let user = await User.create(req.body)
    if (!user) 
      return rep.status(400).send({ status: ResponseStatus.FAILED, erros: this._errorManager.getErrors() })

    let result = await this._createUserUseCase.execute(user)
    if (!result)  
      return rep.status(400).send({ status: ResponseStatus.FAILED, erros: this._errorManager.getErrors() })

    const responseToken = await rep.jwtSign(
      { name: result.Name, username: result.Username, email: result.Email },
      { expiresIn: '4h' }
    )

    return rep.status(201).send({ status: ResponseStatus.SUCCESS, token: responseToken })
  }
}

export default UserController
