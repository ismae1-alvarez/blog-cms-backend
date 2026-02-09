import type { PostDao } from "./post.dao.js";

export class PostService {

  constructor(private readonly postDao: PostDao) { };

  async getPost() {
    return { message: "Se logro" };
  };

  async getPostById(id: string) {
    return id;
  };

  async createPost(post: any, token: string) {
    return { message: "Se logro" };
  };


  async updatePost(post: any, id: string, token: string) {
    return { message: "Se logro" };
  };

  async deletePost(id: string, token: string) {
    return { message: "Se logro" };
  };
};
