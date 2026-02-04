import type { NextFunction, Request, Response } from "express"
export type AsyncType = (req: Request, res: Response, next: NextFunction) => Promise<unknown>


export const asyncWrapper = (handler: AsyncType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next)
  }
}
