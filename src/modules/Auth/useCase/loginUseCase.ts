import { IUserRepositorie } from "../../../shared/context/user/userRepositorie.interface";
import { IErrorManager } from "../../../shared/contracts/core/internal/errorManager.interface";
import { IUseCase } from "../../../shared/contracts/userCase";
import { User } from "../../User/entity/user";
import { LoginCredentialsDTO } from "../schemas/loginDTO";

export class LoginUseCase implements IUseCase<LoginCredentialsDTO, User | null> {
  private readonly _userRepositorie: IUserRepositorie;
  private readonly _errorManager: IErrorManager;

  constructor(userRepositorie: IUserRepositorie, errorManager: IErrorManager) {
    this._userRepositorie = userRepositorie;
    this._errorManager = errorManager;
  }

  async execute(credentials: LoginCredentialsDTO): Promise<User | null> {
    const user = await this._userRepositorie.findByUsername(credentials.username)
    
    if (!user) {
      this._errorManager.addError("Username ou senha inválidos")
      return null
    }

    if(!await user.validatePassword(credentials.password)) {
      this._errorManager.addError("Username ou senha inválidos")
      return null
    }

    return user;
  }
}
