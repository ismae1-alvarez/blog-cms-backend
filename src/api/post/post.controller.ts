import cloudinary from "@config/cloudinaryConfig.js";
// import { uploadToCloudinary } from "@config/multer.js";
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

    // console.log(req.file);
    // const newPost = await this.postService.createPost(req.body);

    return res.status(202).json({ message: "Sdfsf" });
  })

  updatePost = asyncWrapper(async (req: Request, res: Response) => {
    const updatePost = await this.postService.updatePost(req.body, req.params.id as string);

    return res.status(200).json({ updatePost })
  })

  deletePost = asyncWrapper(async (req: Request, res: Response) => {
    const deletePost = await this.postService.deletePost(req.params.id as string);

    return res.status(200).json({ deletePost });
  });

  uploadImage = asyncWrapper(async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({
        message: "No se envió ningún archivo"
      });
    }
    // const result = await uploadToCloudinary(req.file.buffer);

    // return res.json({
    //   url: req.result.secure_url
    // });
  });


}
