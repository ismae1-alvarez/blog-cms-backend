import { exit } from "node:process"
import mongoose from "mongoose"
import { envs } from "./envs.js"
import { logger } from "./logger.js"

export const connectionBD = async () => {
  try {
    const { connection } = await mongoose.connect(envs.DATABASE)
    const url = `${connection.host} : ${connection.port}`
    logger.info(`se conecto bien ${url}`)
  } catch (error) {
    logger.error(`EL error es ${error}`)
    exit(1)
  }
}
