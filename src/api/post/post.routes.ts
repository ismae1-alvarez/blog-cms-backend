import { AuthMiddleware } from "@middleware/JWT.middleware.js";
import { type Request, type Response, Router } from "express"

export class postRouter {
  static get routes(): Router {
    const router = Router()

    router.get("/", (_req: Request, res: Response) => {
      return res.send("Get").status(200)
    });


    router.get("/:id", (_req: Request, res: Response) => {
      return res.send("get/id").status(200).json({ messsage: "Se logro" })
    });

    router.use(AuthMiddleware.protect);

    router.post("/create", (_req: Request, res: Response) => {
      res.send("Create")
    });

    router.put("/update/:id", (_req: Request, res: Response) => {
      res.send("update")
    });

    router.delete("/delete/:id", (_req: Request, res: Response) => {
      res.send("delete")
    });

    return router;
  };
};
