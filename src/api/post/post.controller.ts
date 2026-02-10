import { asyncWrapper } from "@core/asyncWrapper.js"
import type { Request, Response } from "express"
import type { PostService } from "./post.services.js"

export class PostController {
  constructor(private readonly postService: PostService) { }
  getPost = asyncWrapper(async (_req: Request, res: Response) => {
    const post = await this.postService.getPost()
    res.status(200).json({ post })
  });

  getByPost = asyncWrapper(async (req: Request, res: Response) => {
    const post = await this.postService.getPostById(`${req.params.id}`)

    return res.status(200).json({ post });
  })

  createPost = asyncWrapper(async (req: Request, res: Response) => {

    const newPost = await this.postService.createPost(req.body);

    return res.status(202).json({ newPost });
  })

  updatePost = asyncWrapper(async (req: Request, res: Response) => {
    const updatePost = await this.postService.updatePost(req.body, req.params.id as string);

    return res.status(200).json({ updatePost })
  })

  deletePost = asyncWrapper(async (req: Request, res: Response) => {
    const deletePost = await this.postService.deletePost(req.params.id as string);

    return res.status(200).json({ deletePost });
  })
}
