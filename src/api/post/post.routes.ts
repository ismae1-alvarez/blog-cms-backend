import { Router } from "express"

const authRouter: Router = Router()

authRouter.get(
  "/create-account",
  //   validateCreateAccount,
  //   handleInputErrores,
  //   AuthController.createAccount,
  (_req, res) => {
    res.send("Ismael Gomez")
  },
)

export default authRouter
