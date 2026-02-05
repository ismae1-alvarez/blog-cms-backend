import { logger } from "@config/logger.js"
import { asyncWrapper } from "@core/asyncWrapper.js"
import type { Request, Response } from "express"
import type { AuthSevices } from "./auth.services.js"

export class AuthController {

  constructor(private readonly authService: AuthSevices) { }

  createAccountAuth = asyncWrapper(async (req: Request, res: Response) => {
    this.authService
      .CreateAccountService(req.body, req.file)
      .then((user) => res.status(201).json(user))

  })

  loginAuth = asyncWrapper(async (req: Request, res: Response) => {
    this.authService.AuthLoginService(req.body)
      .then((user) => res.status(200).json(user))
  })

  accountAuth = asyncWrapper(async (req: Request, res: Response) => {
    this.authService.GetUser(req.user.id)
      .then((user) => res.status(200).json(user))
  })

  updateAuth = asyncWrapper(async (_req: Request, res: Response) => {
    res.send("Update")
  })
}
