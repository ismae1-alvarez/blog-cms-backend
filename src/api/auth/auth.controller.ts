import type { NextFunction, Request, Response } from "express"
import { AuthSevices } from "./auth.services.js"

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>

const asyncWrapper = (handler: AsyncHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next)
  }
}

export class AuthController {
  static createAccountAuth = asyncWrapper(async (req, res) => {
    const result = await AuthSevices.CreateAccountService(req.body, req.file)

    res.status(201).json(result)
  })

  static loginAuth = asyncWrapper(async (_req: Request, res: Response) => {
    res.send("Login")
  })

  static accountAuth = asyncWrapper(async (_req: Request, res: Response) => {
    res.send("get")
  })

  static updateAuth = asyncWrapper(async (_req: Request, res: Response) => {
    res.send("Update")
  })
}
