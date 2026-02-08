import { AuthMiddleware } from "@middleware/JWT.middleware.js";
import { type Request, type Response, Router } from "express"
import { PostController } from "./post.controller.js";

export class postRouter {
  static get routes(): Router {
    const router = Router()

    const postController = new PostController()

    router.get("/",
      postController.getPost
    );


    router.get("/:id",
      postController.getByPost
    );

    // router.use(AuthMiddleware.protect);

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
