import { CustomError } from "@domain/erorrs.js"
import { checkPassword, hashPassword } from "@utils/auth.js"
import { uploadImage } from "@utils/image.processor.js"
import { JwtAdapter } from "@utils/jwt.js"
import type { IAuth } from "src/models/auth.js"
import type { AccountDao } from "./auth.dao.js"
import type { AuthCreateType, AuthLoginType } from "./auth.schema.js"

export class AuthSevices {
  constructor(private readonly authDao: AccountDao) { }
  async CreateAccountService(
    data: AuthCreateType,
    file?: Express.Multer.File,
  ): Promise<IAuth | null> {
    const { email, password } = data

    const userExists = await this.authDao.findByEmail(email)

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

    return this.authDao.CreateAccountDao({
      ...data,
      img: imageUrl,
      password: hashedPassword,
    })
  }

  async AuthLoginService(data: AuthLoginType): Promise<{ token: string }> {
    const { password, email } = data

    const user = await this.authDao.findByEmail(email)

    if (!user) {
      throw CustomError.unauthorized("Credenciales inválidas")
    }

    // Revisar el password
    const isPasswordCorrect = await checkPassword(password, user.password)

    if (!isPasswordCorrect) {
      throw CustomError.unauthorized("Invalid password or email")
    };

    const token = await JwtAdapter.generateToken({ id: user._id });

    return { token };
  };

  async GetUser(id: string): Promise<IAuth | null> {

    const user = await this.authDao.FingUser(id)
    if (!user) {
      throw CustomError.notFound("Usuario no encontrado");
    };
    return user;
  };
};
