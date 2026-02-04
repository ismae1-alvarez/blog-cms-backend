import { upload } from "@config/multer.js"
import { AuthValidateBody } from "@middleware/auth.middleware.js";
import { AuthMiddleware } from "@middleware/JWT.middleware.js";
import { Router } from "express"
import { AuthController } from "./auth.controller.js"
import { AccountDao } from "./auth.dao.js";
import { AuthCreateSchema, AuthLoginSchema } from "./auth.schema.js"
import { AuthSevices } from "./auth.services.js";

export class AuthRouter {
  static get routes(): Router {
    const router = Router();

    const authDao = new AccountDao()
    const authServices = new AuthSevices(authDao);
    const authController = new AuthController(authServices);


    router.post(
      "/create-account",
      upload.single("img"),
      AuthValidateBody(AuthCreateSchema),
      authController.createAccountAuth
    );
    router.post("/login",
      AuthValidateBody(AuthLoginSchema),
      authController.loginAuth
    );

    // router.use(AuthMiddleware.protect);
    // router.get("/account", AuthController.accountAuth);

    // router.put("/update", AuthController.updateAuth);

    return router;
  };
};
