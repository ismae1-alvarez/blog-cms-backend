import app from "./app.js"
import { envs } from "./config/envs.js"
import { logger } from "./config/logger.js"

const PORT: number = envs.PORT || 4000

app.listen(PORT, () => {
  logger.info(`🚀 Servidor escuchando en el puerto ${PORT}`)
  logger.info(` Presiona CTRL+C para detener\n`)
})
