import { uploadImage } from "@utils/image.processor.js"
import { AccountDao } from "./auth.dao.js"
import type { AuthCreateType } from "./auth.schema.js"
import { hashPassword } from "@utils/auth.js"
import { CustomError } from "@domain/erorrs.js"

export class AuthSevices {
  static async CreateAccountService(
    data: AuthCreateType,
    file?: Express.Multer.File,
  ): Promise<{ message: string }> {
    const { email, password } = data

    const userExists = await AccountDao.findByEmail(email)


    if (userExists) {
      // throw new HttpError("El usuario ya está registrado", 409)
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
      email,
      img: imageUrl,
      password: hashedPassword,
    })
  }


  static async AuthLoginService(data: any): Promise<{ message: string }> {




    return { message: "Se Logro" }
  }
}
