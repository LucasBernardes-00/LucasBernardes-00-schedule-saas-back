import { getCurrentScope } from "../context/di-context"
import { IErrorManager } from "../contracts/core/internal/errorManager.interface"
import { StringExt } from "../core/internal/stringExt"

export class Email {
  private readonly email: string

	private constructor(email: string) {
		this.email = email
	}
  
  static create(email: string): Email | null {
    const errorManager = getCurrentScope().resolve<IErrorManager>('errorManager')
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (StringExt.isNullOrEmptyOrWhiteSpace(email)) {
      errorManager.addError("O campo email não pode está vazio.")
      return null
    }
    else if (!regex.test(email)) {
      errorManager.addError("Email é inválido")
			return null
    }

    return new Email(email)
  }

  static restore(email: string): Email {
    return new Email(email)
  }

  getValue(): string {
    return this.email
  }
}
