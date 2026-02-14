import { asyncWrapper } from "@core/asyncWrapper.js"
import { CustomError } from "@core/erorrs.js"
import type { Request, Response } from "express"
import type { userSevices } from "./user.services.js"

export class UserController {
  constructor(private readonly userService: userSevices) { }

  createAccountAuth = asyncWrapper(async (req: Request, res: Response) => {
    const user = await this.userService.CreateAccountService(req.body, req.file)
    res.status(201).json(user)
  })

  loginAuth = asyncWrapper(async (req: Request, res: Response) => {
    const user = await this.userService.AuthLoginService(req.body)
    res.status(200).json(user)
  })

  accountAuth = asyncWrapper(async (req: Request, res: Response) => {
    const user = await this.userService.GetUserService(req.user.id)
    res.status(200).json(user)
  })

  updateAuth = asyncWrapper(async (req: Request, res: Response) => {
    if (!Object.keys(req.body).length && !req.file) {
      throw CustomError.badRequest("No hay datos para actualizar");
    }

    const id = req.user.id;
    const data = { id, ...req.body }

    const result = await this.userService.UpdateUserService(data, req.file)
    res.status(200).json(result)
  });
}
