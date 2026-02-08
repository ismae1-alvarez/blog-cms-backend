import { asyncWrapper } from "@core/asyncWrapper.js";
import type { Request, Response } from "express";

export class PostController {
  getPost = asyncWrapper(async (_req: Request, res: Response) => {
    res.status(200).json({ message: "sdfs" })
  });

  getByPost = asyncWrapper(async (_req: Request, res: Response) => {
    res.status(200).json({ message: "id" })
  });


}
