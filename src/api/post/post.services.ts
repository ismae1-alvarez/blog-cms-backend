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

  async updatePost(updatePost: any, id: string): Promise<{ message: string }> {
    const post = await this.postDao.updatePost(updatePost, id)
    return post
  }

  async deletePost(id: string): Promise<{ message: string }> {
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
