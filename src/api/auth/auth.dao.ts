import Auth, { type IAuth } from "../../models/auth.js"
import type { AuthCreateDbType, } from "./auth.schema.js"

export class AccountDao {
  static async findByEmail(email: string): Promise<IAuth | null> {
    return await Auth.findOne({ email })
  }

  static async CreateAccountDao(data: AuthCreateDbType): Promise<{ message: string } | null> {
    const user = new Auth(data)

    await user.save()

    return { message: `Se creo con exito este wey: ${user}` }
  }
}
