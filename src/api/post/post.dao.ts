import Post, { type IPost } from "src/models/post.js"
import type { CreatePostType } from "./post.schema.js"

export class PostDao {
  async findPost(): Promise<IPost[]> {
    const findPost = await Post.find()
    return findPost
  }
  async findByIdPost(id: string): Promise<IPost> {
    return await Post.findById(id).select("-password")
  }

  async createPost(post: CreatePostType): Promise<{ message: string }> {
    const doc = new Post(post);
    await doc.save()
    return { message: "Saved successfully" }
  };

  async updatePost(postUpdate: any, id: string): Promise<{ message: string }> {
    return { message: `updatePost: ${postUpdate} - ${id}` }
  }

  async deletePost(id: string): Promise<{ message: string }> {
    return { message: `Delete post ${id}` }
  }
}
