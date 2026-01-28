import type { Application, Request, Response } from "express"
import express from "express"
import { connectionBD } from "./config/db.js"
import { errorHandler } from "./middleware/error.middleware.js"
import { AppRoutes } from "./routes/index.js"

class App {
  public app: Application

  constructor() {
    this.app = express()
    this.connectDatabase()
    this.config()
    this.routes()
  }

  private async connectDatabase(): Promise<void> {
    await connectionBD()
  }

  private config(): void {
    // Middleware
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  private routes(): void {
    this.app.get("/", (_req: Request, res: Response) => {
      res.send("Hola Mundo desde la App")
    })

    this.app.use("/api/v1/", AppRoutes.routes)

    // Middleware Valibor Auth
    this.app.use(errorHandler)
  }
}

export default new App().app
