import { Router } from "express"
import { AuthRouter } from "../api/auth/auth.routes.js"

export class AppRoutes {
  static get routes(): Router {
    const routes = Router()

    // Router Auth
    routes.use(AuthRouter.routes)

    return routes
  }
}
