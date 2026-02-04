import { asyncWrapper } from "@core/asyncWrapper.js"
import type { Request, Response } from "express"
import type { AuthSevices } from "./auth.services.js"

export class AuthController {
  constructor(private readonly authService: AuthSevices) { }

  createAccountAuth = asyncWrapper(async (req: Request, res: Response) => {
    // const result = await AuthSevices.CreateAccountService(req.body, req.file)
    this.authService
      .CreateAccountService(req.body, req.file)
      .then((user) => res.status(201).json(user))

    // res.status(201).json(result)
  })

  loginAuth = asyncWrapper(async (req: Request, res: Response) => {
    const result = await this.authService.AuthLoginService(req.body)

    res.status(200).json(result)
  })

  accountAuth = asyncWrapper(async (_req: Request, res: Response) => {
    res.send("get")
  })

  updateAuth = asyncWrapper(async (_req: Request, res: Response) => {
    res.send("Update")
  })
}
