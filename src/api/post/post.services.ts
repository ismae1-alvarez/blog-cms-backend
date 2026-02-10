import type { IPost } from "src/models/post.js"
import type { PostDao } from "./post.dao.js"

export class PostService {
  constructor(private readonly postDao: PostDao) { }

  async getPost(): Promise<IPost[]> {
    return await this.postDao.findPost()
  };

  async getPostById(id: string): Promise<IPost> {
    const post = await this.postDao.findByPost(id)

    console.log(post)

    return post
  }

  async createPost(dataPost: any): Promise<{ message: string }> {
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
  }
}
