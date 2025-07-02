import { IErrorManager } from "../../../shared/contracts/core/internal/errorManager.interface"
import { StringExt } from "../../../shared/core/internal/stringExt"
import { ResponseStatus } from "../../../shared/enum/responseStatus.enum"
import { FastifyReplyTypeBox } from "../../../shared/types.ts/fastify-reply.type"
import { FastifyRequestTypeBox } from "../../../shared/types.ts/fastify-request.type"
import { loginSchema } from "../schemas/login"
import { LoginUseCase } from "../useCase/loginUseCase"

class AuthController {
  private readonly _errorManager: IErrorManager
  private readonly _loginUseCase: LoginUseCase

  constructor(
    errorManager: IErrorManager,
    loginUseCase: LoginUseCase
  ) {
    this._errorManager = errorManager
    this._loginUseCase = loginUseCase
  }

  async login(
    req: FastifyRequestTypeBox<typeof loginSchema>,
		rep: FastifyReplyTypeBox<typeof loginSchema>
  ) {
    if (StringExt.isNullOrEmptyOrWhiteSpace(req.body.username))
      this._errorManager.addError('O campo username deve ser preenchido')

    if (StringExt.isNullOrEmptyOrWhiteSpace(req.body.password))
      this._errorManager.addError('O campo senha deve ser preenchido')

    if (this._errorManager.hasErrors())
      return rep.status(400).send({ status: ResponseStatus.FAILED, errors: this._errorManager.getErrors() })

    let user = await this._loginUseCase.execute(req.body)
    if (!user) {
      return rep.status(400).send({ status: ResponseStatus.FAILED, errors: this._errorManager.getErrors() })
    }

    const token = await rep.jwtSign(
      {name: user.Name, username: user.Username, id: user.Id, email: user.Email}, 
      { expiresIn: req.body.rememberMe ? '7d' : '4h'}
    )
    
    return rep.status(200).send({ status: ResponseStatus.SUCCESS, token: token })
  }
}

export default AuthController
