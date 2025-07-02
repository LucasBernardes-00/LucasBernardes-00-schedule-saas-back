import { getCurrentScope } from "../../../shared/context/di-context"
import { IErrorManager } from "../../../shared/contracts/core/internal/errorManager.interface"
import { StringExt } from "../../../shared/core/internal/stringExt"
import { Email } from "../../../shared/valueObjects/email"
import { Password } from "../../../shared/valueObjects/password"
import { CreateUserDTO, RestoreUserDTO } from "../schemas/userDTO"

export class User {
  private id?: string
  private name: string
  private username: string
  private email: Email
  private password: Password

  private constructor(
    name: string, 
    username: string, 
    email: Email, 
    password: Password, 
    id?: string
  ) {
    this.id = id
    this.name = name
    this.username = username
    this.email = email
    this.password = password
  }

  static async create(user: CreateUserDTO): Promise<User | null> {
    const errorManager =  getCurrentScope().resolve<IErrorManager>('errorManager')

    if (StringExt.isNullOrEmptyOrWhiteSpace(user.name)) {
			errorManager.addError("Campo nome é obrigatório")
		}
		if (StringExt.isNullOrEmptyOrWhiteSpace(user.username)) {
			errorManager.addError("Campo username é obrigatório")
		}
		let emailVO = Email.create(user.email)
    let passwordVO = await Password.create(user.password)

    return errorManager.hasErrors() ? null :  new User(user.name, user.username, emailVO!, passwordVO!)
  }

  static restore(user: RestoreUserDTO): User {
    let emailVO = Email.restore(user.email)
    let passwordVO = Password.restore(user.password)

    return new User(user.name, user.username, emailVO, passwordVO, user.id)
  }

  async validatePassword(password: string): Promise<boolean> { 
    return await this.password.compare(password)
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
