import { AuthValidateBody } from "@middleware/auth.middleware.js";
import { AuthMiddleware } from "@middleware/JWT.middleware.js";
import { Router } from "express"
import { PostController } from "./post.controller.js";
import { PostDao } from "./post.dao.js";
import { CreatePostSchema } from "./post.schema.js";
import { PostService } from "./post.services.js";

export class postRouter {
  static get routes(): Router {
    const router = Router()


    const postDao = new PostDao();
    const postService = new PostService(postDao);
    const postController = new PostController(postService);

    router.get("/",
      postController.getPost
    );


    router.get("/:id",
      postController.getByPost,
    );

    router.use(AuthMiddleware.protect);

    router.post("/create",
      AuthValidateBody(CreatePostSchema),
      postController.createPost
    );

    router.put("/update/:id",
      postController.updatePost
    );

    router.delete("/delete/:id",
      postController.deletePost
    );

    return router;
  };
};
