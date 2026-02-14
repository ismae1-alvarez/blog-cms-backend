import { CustomError } from "@core/erorrs.js"
import { checkPassword, hashPassword } from "@utils/auth.js"
import { uploadImage } from "@utils/image.processor.js"
import { JwtAdapter } from "@utils/jwt.js"
import type { IAuth } from "src/models/auth.js"
import type { AccountUserDao } from "./user.dao.js"
import type { AuthCreateType, AuthFullUpdateType, AuthLoginType } from "./user.schema.js"

export class userSevices {
  constructor(private readonly authDao: AccountUserDao) { }
  async CreateAccountService(
    data: AuthCreateType,
    file?: Express.Multer.File,
  ): Promise<IAuth | null> {
    const { email, password } = data

    const userExists = await this.authDao.findByEmailDao(email)

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

    const user = await this.authDao.findByEmailDao(email)

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

  async GetUserService(id: string): Promise<IAuth | null> {
    const user = await this.authDao.FingUserDao(id)
    if (!user) {
      throw CustomError.notFound("Usuario no encontrado");
    };
    return user;
  };

  async UpdateUserService(updateUser: AuthFullUpdateType, file?: Express.Multer.File,): Promise<{ message: string }> {
    const user = await this.GetUserService(updateUser.id);


    if (updateUser.email && updateUser.email !== user.email) {
      // await this.authDao.findByEmail(updateUser.email)
      const emailExists = await this.authDao.findByEmailDao(updateUser.email)
      if (emailExists) {
        throw CustomError.conflict("El email ya está en uso")
      }

      user.email = updateUser.email;
    };

    // Name
    if (updateUser.name) {
      user.name = updateUser.name
    }

    if (updateUser.description) {
      user.description = updateUser.description
    }

    // Password
    if (updateUser.password) {
      user.password = await hashPassword(updateUser.password)
    }

    // Imagen
    if (file) {
      user.img = await uploadImage(file, {
        folder: "users",
        publicId: `user_${user._id}`,
      });
    };

    return await this.authDao.UpdateUserDao(user)
  };


};
