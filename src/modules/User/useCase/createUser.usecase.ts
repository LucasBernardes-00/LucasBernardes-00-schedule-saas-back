import { IUserRepositorie } from "../../../shared/context/user/userRepositorie.interface"
import { IErrorManager } from "../../../shared/contracts/core/internal/errorManager.interface"
import { IUseCase } from "../../../shared/contracts/userCase"
import { User } from "../entity/user"

export class CreateUserUseCase implements IUseCase<User, User | null> {
  private readonly _repositorie: IUserRepositorie
	private readonly _errorManager: IErrorManager
  
  constructor(
    userRepositorie: IUserRepositorie,
    errorManager: IErrorManager
  ) {
    this._repositorie = userRepositorie
    this._errorManager = errorManager
  }

  async execute(user: User): Promise<User | null> {
    if (!await this.validate(user)) 
			return null

    let result = await this._repositorie.create(user)
		if (!result) {
			this._errorManager.addError("Erro ao criar usuário")
			return null
		}

    return result
  }

  private async validate(user: User): Promise<boolean> {
    if (await this._repositorie.usernameExists(user.Username)) {
      this._errorManager.addError("Username já existe")
    }
    if (await this._repositorie.emailExists(user.Email)) {
      this._errorManager.addError("Email já existe")
    }

    return this._errorManager.hasErrors() ? false : true
  }
}
