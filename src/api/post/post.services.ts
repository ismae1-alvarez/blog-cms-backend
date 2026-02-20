import { CustomError } from "@core/erorrs.js"
import { deleteImage } from "@utils/deleteImage.js"
import { uploadImage } from "@utils/image.processor.js"
import type { IPost } from "src/models/post.js"
import type { PostDao } from "./post.dao.js"
import type { CreatePostType } from "./post.schema.js"

export class PostService {
  constructor(private readonly postDao: PostDao) { }

  async getPost(): Promise<IPost[]> {
    return await this.postDao.findPost()
  }

  async getPostById(id: string): Promise<IPost> {
    const post = await this.postDao.findByIdPost(id)
    return post
  }

  async createPost(dataPost: CreatePostType): Promise<{ message: string }> {
    const post = await this.postDao.createPost(dataPost)
    return post
  }

  async updatePost(updatePost: CreatePostType, id: string): Promise<{ message: string }> {

    const existingPost = await this.getPostById(id);


    if (!existingPost) {
      throw CustomError.notFound("Post no encontrado");
    }
    const updated = await this.postDao.updatePost(id, updatePost);

    return updated;
  }

  async deletePost(id: string): Promise<{ message: string }> {
    const existingPost = await this.getPostById(id);

    if (!existingPost) {
      throw CustomError.notFound("Post no encontrado");
    }

    const images = existingPost.content.filter(
      (item: any) => item.type === "image" && item.meta?.id_public
    );

    await Promise.all(
      images.map((img: any) =>
        deleteImage(img.meta.id_public)
      )
    );

    const post = await this.postDao.deletePost(id)
    return post
  };

  async uploadPost(file?: Express.Multer.File): Promise<{ url: string, public_id: string }> {
    let imageUrl: { url: string, public_id: string }

    if (file) {
      imageUrl = await uploadImage(file, {
        folder: "post",
        publicId: `post_${Date.now()}`,
      })
    }

    return imageUrl;
  };
}
