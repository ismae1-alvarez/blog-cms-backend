import { envs } from "@config/envs.js";
import jwt, { type Secret } from "jsonwebtoken";

const JWT_SECRET: Secret = envs.JWT as string;

export class JwtAdapter {
  static async generateToken(
    payload: object,
    duration: jwt.SignOptions["expiresIn"] = "3h"
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SECRET, { expiresIn: duration }, (err, token) => {
        if (err || !token) return resolve(null);
        resolve(token);
      });
    });
  }

  static async validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded as T);
      });
    });
  }
}
