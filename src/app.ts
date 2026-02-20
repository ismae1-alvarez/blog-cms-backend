import { connectionBD } from "@config/db.js"
import { limiter } from "@config/rate.limit.js"
import { globalErrorHandler } from "@middleware/error.middleware.js"
import { AppRoutes } from "@routes/index.js"
import type { Application, Request, Response } from "express"
import express from "express"

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
    // Body parsers
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(limiter)

  }


  private routes(): void {

    this.app.get("/", limiter, (_req: Request, res: Response) => {
      res.send("Hola Mundo desde la App")
    });


    this.app.use("/api/v1/", limiter, AppRoutes.routes)

    // Middleware Valibor Auth
    this.app.use(globalErrorHandler)
  }
}

export default new App().app
