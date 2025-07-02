import bcrypt from 'bcrypt'

export class HashManager {
  static async hashString(value: string, saltRounds = 10): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds)
		return bcrypt.hash(value, salt)
  }

  static async comparePassword(value: string, hash: string): Promise<boolean> {
		return await bcrypt.compare(value, hash)
	}
}
