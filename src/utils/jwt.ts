import jwt from "jsonwebtoken"
import type { Types } from "mongoose"
import { envs } from "../config/envs.js"

type UserPayload = {
  id: Types.ObjectId
}

export const generateJWT = (payload: UserPayload) => {
  const token = jwt.sign(payload, envs.JWT, {
    expiresIn: "4d",
  })

  return token
}
