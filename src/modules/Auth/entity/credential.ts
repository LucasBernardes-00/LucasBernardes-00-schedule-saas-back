import { getCurrentScope } from "../../../shared/context/di-context"
import { IErrorManager } from "../../../shared/contracts/core/internal/errorManager.interface"
import { StringExt } from "../../../shared/core/internal/stringExt"
import { LoginCredentialsDTO } from "../schemas/loginDTO"

export class Credential {
  private username: string
  private password: string
  private rememberMe: boolean

  private constructor(username: string, password: string, rememberMe: boolean = false) {
    this.username = username
    this.password = password
    this.rememberMe = rememberMe
  }

  static create(dto: LoginCredentialsDTO): Credential | null {
    const errorManager =  getCurrentScope().resolve<IErrorManager>('errorManager')

    if (StringExt.isNullOrEmptyOrWhiteSpace(dto.username))
      errorManager.addError('O campo username deve ser preenchido')
    
    if (StringExt.isNullOrEmptyOrWhiteSpace(dto.password))
      errorManager.addError('O campo senha deve ser preenchido')

    return errorManager.hasErrors() ? null : new Credential(dto.username, dto.password, dto.rememberMe)
  }

  get Username(): string {
    return this.username
  }

  get Password(): string {
    return this.password
  }

  get RememberMe(): boolean {
    return this.rememberMe
  }
}
