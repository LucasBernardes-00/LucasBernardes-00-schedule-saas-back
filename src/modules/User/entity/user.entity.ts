import { getCurrentScope } from "../../../shared/context/di-context"
import { IErrorManager } from "../../../shared/contracts/core/internal/errorManager.interface"
import { StringExt } from "../../../shared/core/internal/stringExt"
import { Email } from "../../../shared/valueObjects/email"
import { Password } from "../../../shared/valueObjects/password"

export class User {
  private id?: string
  private name: string
  private username: string
  private email: Email
  private password: Password

  private constructor(name: string, username: string, email: Email, password: Password, id?: string) {
    this.id = id
    this.name = name
    this.username = username
    this.email = email
    this.password = password
  }

  static async create(name: string, username: string, email: string, password: string): Promise<User | null> {
    const errorManager =  getCurrentScope().resolve<IErrorManager>('errorManager')

    if (StringExt.isNullOrEmptyOrWhiteSpace(name)) {
			errorManager.addError("Campo nome é obrigatório")
		}
		if (StringExt.isNullOrEmptyOrWhiteSpace(username)) {
			errorManager.addError("Campo username é obrigatório")
		}
		let emailVO = Email.create(email)
    let passwordVO = await Password.create(password)

    return errorManager.hasErrors() ? null :  new User(name, username, emailVO!, passwordVO!)
  }

  static restore(name: string, username: string, email: string, password: string, id: string): User {
    let emailVO = Email.restore(email)
    let passwordVO = Password.restore(password)

    return new User(name, username, emailVO, passwordVO, id)
  }

  //#region Getters
  get Id() {
    return this.id
  }

  get Name() {
    return this.name
  }

  get Username() {
    return this.username
  }

  get Email() {
    return this.email.getValue()
  }

  get Password() {
    return this.password.getValue()
  }
  //#endregion
}
