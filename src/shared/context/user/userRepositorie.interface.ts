import { User } from "../../../modules/User/entity/user"

export interface IUserRepositorie {
  create(user: User): Promise<string | null>
	usernameExists(username: string): Promise<boolean>
	emailExists(email: string): Promise<boolean>
	findByUsername(username: string): Promise<User | null>
}
