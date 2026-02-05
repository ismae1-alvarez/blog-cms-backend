import { JwtAdapter } from "@utils/jwt.js"
import type { NextFunction, Request, Response } from "express"
import Auth from "src/models/auth.js"

declare global {
  namespace Express {
    interface Request {
      user?: typeof user
    }
  }
};


export class AuthMiddleware {
  static async protect(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization")
    if (!authorization) return res.status(401).json({ message: "No token provided" })

    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ message: "Invalid token" })
    const token = authorization.split(" ")[1];

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token)

      if (!payload?.id)
        return res.status(401).json({ message: "Invalid token" })

      const user = await Auth
        .findById(payload.id)
        .select("-password")

      if (!user)
        return res.status(401).json({ message: "User not found" })

      req.user = user
      next()

    } catch (error: unknown) {
      return res.status(500).json({ message: "Something went wrong!" })
    }
  }
}
