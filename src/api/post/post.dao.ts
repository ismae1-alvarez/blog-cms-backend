import Post, { type IPost } from "src/models/post.js"
import type { CreatePostType } from "./post.schema.js"

export class PostDao {
  async findPost(): Promise<IPost[]> {
    const findPost = await Post.find()
    return findPost
  }
  async findByIdPost(id: string): Promise<IPost> {
    return await Post.findById(id)
  }

  async createPost(post: CreatePostType): Promise<{ message: string }> {
    const doc = new Post(post);
    await doc.save()
    return { message: "Saved successfully" }
  };

  async updatePost(id: string, data: CreatePostType): Promise<{ message: string }> {
    const reult: CreatePostType = await Post.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );

    return { message: `update post ${reult.title}` }

  }

  async deletePost(id: string): Promise<{ message: string }> {
    await Post.findByIdAndDelete(id);

    return { message: "Post eliminado correctamente" };
  };
};
