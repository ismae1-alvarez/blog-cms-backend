import "dotenv/config"
import env from "env-var"

export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),
  DATABASE: env.get("DATABASE_URL").required().asString(),
  JWT: env.get("JWT_SEED").required().asString(),
}
