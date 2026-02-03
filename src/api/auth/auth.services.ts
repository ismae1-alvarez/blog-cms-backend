import { CustomError } from "@domain/erorrs.js"
import { checkPassword, hashPassword } from "@utils/auth.js"
import { uploadImage } from "@utils/image.processor.js"
import { JwtAdapter } from "@utils/jwt.js"
import type { IAuth } from "src/models/auth.js"
import { AccountDao } from "./auth.dao.js"
import type { AuthCreateType, AuthLoginType } from "./auth.schema.js"

export class AuthSevices {
  static async CreateAccountService(
    data: AuthCreateType,
    file?: Express.Multer.File,
  ): Promise<IAuth | null> {
    const { email, password } = data

    const userExists = await AccountDao.findByEmail(email)

    if (userExists) {
      throw CustomError.conflict("El usuario ya está registrado")
    }

    let imageUrl = ""

    if (file) {
      imageUrl = await uploadImage(file, {
        folder: "users",
        publicId: `user_${Date.now()}`,
      })
    }

    const hashedPassword = await hashPassword(password)

    return AccountDao.CreateAccountDao({
      ...data,
      img: imageUrl,
      password: hashedPassword,
    })
  }

  static async AuthLoginService(data: AuthLoginType): Promise<{ token: string }> {
    const { password, email } = data

    const user = await AccountDao.findByEmail(email)

    if (!user) {
      throw CustomError.unauthorized("Credenciales inválidas")
    }

    // Revisar el password
    const isPasswordCorrect = await checkPassword(password, user.password)

    if (!isPasswordCorrect) {
      throw CustomError.unauthorized("Invalid password or email")
    }

    const token = await JwtAdapter.generateToken({ id: user._id })
    // const token = generateJWT({ id: user._id })

    return { token }
  }
}
