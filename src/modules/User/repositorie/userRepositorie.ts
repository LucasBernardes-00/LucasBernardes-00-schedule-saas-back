import { PrismaClient } from "@prisma/client"
import { IUserRepositorie } from "../../../shared/context/user/userRepositorie.interface"
import { User } from "../entity/user"

export class UserRepositorie implements IUserRepositorie {
  private readonly _prisma: PrismaClient
  
  constructor(prisma: PrismaClient) {
    this._prisma = prisma
  }

  async create(user: User): Promise<string | null> {
    try {
			let result = await this._prisma.user.create({
				data: {
					name: user.Name,
					username: user.Username,
					email: user.Email,
					password: user.Password
				}
			})
	
			return result.id
		}
		catch (e) {
			return null
		}
  }

  async usernameExists(username: string): Promise<boolean> {
    let user = await this._prisma.user.findUnique({
			where: {
				username: username
			}
		})
		return user ? true : false
  }

  async emailExists(email: string): Promise<boolean> {
    let user = await this._prisma.user.findUnique({
			where: {
				email: email
			}
		})
		return user ? true : false
  }

	async findByUsername(username: string): Promise<User | null> {
		let data = await this._prisma.user.findUnique({
			where: {
				username: username
			}
		})

		if (!data) return null

		return User.restore({ id: data.id, name: data.name, username: data.username, email: data.email, password: data.password })
	}
}