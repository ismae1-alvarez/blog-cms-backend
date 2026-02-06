import { userRouter } from "@api/user/user.routes.js"
import { Router } from "express"

export class AppRoutes {
  static get routes(): Router {
    const routes = Router()

    // Router Auth
    routes.use(userRouter.routes)

    return routes
  }
}
