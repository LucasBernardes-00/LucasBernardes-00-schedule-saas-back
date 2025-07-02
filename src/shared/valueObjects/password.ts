import { getCurrentScope } from "../context/di-context"
import { IErrorManager } from "../contracts/core/internal/errorManager.interface"
import { HashManager } from "../core/external/hashManager"
import { StringExt } from "../core/internal/stringExt"

export class Password {
	private readonly password: string

	private constructor(password: string) {
		this.password = password
	}

  static async create(password: string): Promise<Password | null> {
    const errorManager = getCurrentScope().resolve<IErrorManager>('errorManager')

    if (StringExt.isNullOrEmptyOrWhiteSpace(password)) {
			errorManager.addError("Campo senha é obrigatório")
			return null
		}

    return new Password(await HashManager.hashString(password))
  }

  static restore(passwordHashed: string): Password {
    return new Password(passwordHashed)
  }

  getValue() {
		return this.password
	}

  async compare(password: string): Promise<boolean> {
    return await HashManager.comparePassword(password, this.password)
  }
}
