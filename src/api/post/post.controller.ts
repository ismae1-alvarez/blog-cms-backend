import { asyncWrapper } from "@core/asyncWrapper.js"
import { CustomError } from "@core/erorrs.js";
import { isValidObjectId } from "@core/isValidObjectId.js";
import type { Request, Response } from "express"
import type { PostService } from "./post.services.js"

export class PostController {
  constructor(private readonly postService: PostService) { }
  getPost = asyncWrapper(async (_req: Request, res: Response) => {
    const post = await this.postService.getPost()
    res.status(200).json({ post })
  });

  getByPost = asyncWrapper(async (req: Request, res: Response) => {

    if (!isValidObjectId(req.params.id as string)) {
      throw CustomError.badRequest("ID Invalido")
    };
    const post = await this.postService.getPostById(`${req.params.id}`);

    return res.status(200).json({ post });
  });

  createPost = asyncWrapper(async (req: Request, res: Response) => {

    const newPost = await this.postService.createPost(req.body);

    return res.status(202).json({ newPost });
  })

  updatePost = asyncWrapper(async (req: Request, res: Response) => {
    if (!isValidObjectId(req.params.id as string)) {
      throw CustomError.badRequest("ID Invalido")
    }
    const updatePost = await this.postService.updatePost(req.body, req.params.id as string);

    return res.status(200).json({ updatePost })
  })

  deletePost = asyncWrapper(async (req: Request, res: Response) => {
    if (!isValidObjectId(req.params.id as string)) {
      throw CustomError.badRequest("ID Invalido")
    }
    const deletePost = await this.postService.deletePost(req.params.id as string);

    return res.status(200).json({ deletePost });
  });

  uploadImage = asyncWrapper(async (req: Request, res: Response) => {
    if (!req.file) {
      throw CustomError.badRequest("No hay archivos");
    };

    const img_url = await this.postService.uploadPost(req.file)

    res.status(202).json({ img_url });
  });

};
