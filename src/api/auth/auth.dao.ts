import Auth, { type IAuth } from "src/models/auth.js"
import type { AuthCreateType } from "./auth.schema.js"

export class AccountDao {
  async findByEmail(email: string): Promise<IAuth | null> {
    return await Auth.findOne({ email })
  };
  async CreateAccountDao(data: AuthCreateType): Promise<IAuth | null> {
    const user = new Auth(data)
    return await user.save()
  };

  async FingUser(id: string): Promise<IAuth | null> {
    return await Auth.findById(id).select("-password")
  };
};
