import { Router } from "express"
import { upload } from "../../config/multer.js"
import { uploadToCloudinary } from "../../middleware/auth.cloudinary.middleware.js"
import { AuthValidateBody } from "../../middleware/auth.middleware.js"
import { AuthController } from "./auth.controller.js"
import { AuthCreateSchema } from "./auth.schema.js"

export class AuthRouter {
  static get routes(): Router {
    const router = Router()

    router.post(
      "/create-account",
      upload.single("img"), // multer en memoria
      uploadToCloudinary, // sube a Cloudinary
      AuthValidateBody(AuthCreateSchema),

      AuthController.createAccountAuth,
    )

    router.post("/login", AuthController.loginAuth)

    router.get("/account", AuthController.accountAuth)

    router.put("/update", AuthController.updateAuth)

    return router
  }
}
