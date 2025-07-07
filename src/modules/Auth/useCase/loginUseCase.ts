import { IUserRepositorie } from "../../../shared/context/user/userRepositorie.interface"
import { IErrorManager } from "../../../shared/contracts/core/internal/errorManager.interface"
import { IUseCase } from "../../../shared/contracts/userCase"
import { User } from "../../User/entity/user"
import { Credential } from "../entity/credential"

export class LoginUseCase implements IUseCase<Credential, User | null> {
  private readonly _userRepositorie: IUserRepositorie;
  private readonly _errorManager: IErrorManager;

  constructor(userRepositorie: IUserRepositorie, errorManager: IErrorManager) {
    this._userRepositorie = userRepositorie;
    this._errorManager = errorManager;
  }

  async execute(credentials: Credential): Promise<User | null> {
    const user = await this._userRepositorie.findByUsername(credentials.Username)
    
    if (!user) {
      this._errorManager.addError("Username ou senha inválidos")
      return null
    }

    if(!await user.validatePassword(credentials.Password)) {
      this._errorManager.addError("Username ou senha inválidos")
      return null
    }

    return user;
  }
}
