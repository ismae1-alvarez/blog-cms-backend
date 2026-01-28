import { hashPassword } from "../../utils/auth.js"
import { AccountDao } from "./auth.dao.js"
import type { AuthCreateType } from "./auth.schema.js"

export class AuthSevices {
  static async CreateAccountService(data: AuthCreateType): Promise<{ message: string } | null> {
    const { name, description, email, password, img } = data

    // Validar si el email ya existe
    const userExists = await AccountDao.findByEmail(email)

    if (userExists) {
      const error = new Error("El usuario ya está registrado...")
      ;(error as any).status = 409
      throw error
    }

    // HashPassword
    const hashedPassword = await hashPassword(password)

    // Guardamos los datos

    return await AccountDao.CreateAccountDao({
      name,
      description,
      email,
      img,
      password: hashedPassword,
    })
  }
}
