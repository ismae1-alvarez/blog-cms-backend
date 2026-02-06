import { upload } from "@config/multer.js"
import { AuthValidateBody } from "@middleware/auth.middleware.js";
import { AuthMiddleware } from "@middleware/JWT.middleware.js";
import { Router } from "express"
import { UserController } from "./user.controller.js";
import { AccountUserDao } from "./user.dao.js";
import { AuthCreateSchema, AuthLoginSchema, AuthUpdateSchema } from "./user.schema.js"
import { userSevices } from "./user.services.js";

export class userRouter {
  static get routes(): Router {
    const router = Router();

    const authDao = new AccountUserDao()
    const authServices = new userSevices(authDao);
    const authController = new UserController(authServices);

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

    router.use(AuthMiddleware.protect);
    router.get("/account", authController.accountAuth);

    router.put("/update",
      upload.single("img"),
      AuthValidateBody(AuthUpdateSchema),
      authController.updateAuth
    );

    return router;
  };
};
