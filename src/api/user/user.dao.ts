import Auth, { type IAuth } from "src/models/auth.js"
import type { AuthCreateType } from "./user.schema.js"

export class AccountUserDao {
  async findByEmailDao(email: string): Promise<IAuth | null> {
    return await Auth.findOne({ email })
  };
  async CreateAccountDao(data: AuthCreateType): Promise<IAuth | null> {
    const user = new Auth(data)
    return await user.save()
  };

  async FingUserDao(id: string): Promise<IAuth | null> {
    return await Auth.findById(id).select("-password")
  };

  async UpdateUserDao(user: IAuth): Promise<{ message: string }> {
    await user.save()
    return { message: "success" }
  }

};
