export class PostDao {

  async findPost(): Promise<{ message: string }> {
    return { message: "Hellor find post" };
  };
  async findByPost(id: string): Promise<{ message: string }> {
    return { message: ` find post by id : ${id}` };
  };

  async createPost(post: any): Promise<{ message: string }> {
    return { message: `Create Post ${post}` }
  };

  async updatePost(postUpdate: any, id: string): Promise<{ message: string }> {
    return { message: `updatePost: ${postUpdate} - ${id}` }
  };

  async deletePost(id: string): Promise<{ message: string }> {
    return { message: `Delete post ${id}` };
  };

};
