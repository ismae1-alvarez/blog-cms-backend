import type { NextFunction, Request, Response } from "express"
import { type BaseSchema, safeParse } from "valibot"

export function AuthValidateBody<TSchema extends BaseSchema<any, any, any>>(schema: TSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = safeParse(schema, req.body)

    if (!parsed.success) {
      const errors = parsed.issues.map((i) => ({
        path: i.path?.map((p) => ("key" in p ? p.key : p.index)).join(".") || "body",
        message: i.message,
      }))

      return res.status(400).json({ errors })
    }
    // Si la validacion pasa
    req.body = parsed.output as any
    next()
  }
}
