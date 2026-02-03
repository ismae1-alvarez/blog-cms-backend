import { upload } from "@config/multer.js"
import { AuthValidateBody } from "@middleware/auth.middleware.js";
import { Router } from "express"
import { AuthController } from "./auth.controller.js"
import { AuthCreateSchema, AuthLoginSchema } from "./auth.schema.js"

export class AuthRouter {
  static get routes(): Router {
    const router = Router();

    router.post(
      "/create-account",
      upload.single("img"),
      AuthValidateBody(AuthCreateSchema),
      AuthController.createAccountAuth,
    );
    router.post("/login",
      AuthValidateBody(AuthLoginSchema),
      AuthController.loginAuth
    );

    router.get("/account", AuthController.accountAuth);

    router.put("/update", AuthController.updateAuth);

    return router;
  };
};
