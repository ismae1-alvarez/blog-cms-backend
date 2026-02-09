import { asyncWrapper } from "@core/asyncWrapper.js";
import type { Request, Response } from "express";
import type { PostService } from "./post.services.js";

export class PostController {

  constructor(private readonly postService: PostService) { };
  getPost = asyncWrapper(async (_req: Request, res: Response) => {
    res.status(200).json({ message: "sdfs" })
  });

  getByPost = asyncWrapper(async (_req: Request, res: Response) => {
    res.status(200).json({ message: "id" })
  });

  createPost = asyncWrapper(async (_req: Request, res: Response) => {
    res.status(200).json({ message: "Create Post" });
  });

  updatePost = asyncWrapper(async (_req: Request, res: Response) => {
    res.status(200).json({ message: "update Post" })
  });

  deletePost = asyncWrapper(async (_req: Request, res: Response) => {
    res.status(200).json({ message: "Delete Post" })
  });

};
