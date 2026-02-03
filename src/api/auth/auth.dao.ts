import Auth, { type IAuth } from "src/models/auth.js"
import type { AuthCreateType } from "./auth.schema.js"

export class AccountDao {
  static async findByEmail(email: string): Promise<IAuth | null> {
    return await Auth.findOne({ email })
  };
  static async CreateAccountDao(data: AuthCreateType): Promise<IAuth | null> {
    const user = new Auth(data)

    return await user.save()

  };
};
