import { listenerCount } from "node:cluster";
import { PostRepository } from "../repositories/PostRepository";
import { UserRepository } from "../repositories/UserRepository";


export class NotFoundError extends Error {}
export class UnauthorizedError extends Error {}


export const PostServices = {
  async listAll() {
    return PostRepository.findAll();
  },

  async getById(id: number) {
    const post = await PostRepository.findById(id);

    if (!post) {
      throw new NotFoundError("Post não encontrado.");
    }

    return post;

  },

  ///////////////////////////////////////////////


  async create(data: { title: string},  looggedUserId: number ) {

    if (!data.title) {
      throw new NotFoundError("Titulo não encontrado.");
    }

    const user = await UserRepository.findById(looggedUserId);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado.");
    }
    
    return PostRepository.create({
      title: data.title,
      user
    });
  },

  /////////////
  
  async listMyPost(userId: number){
    return PostRepository.findByUserId(userId)
  },

  async update(id: number, data: { title?: string}, looggedUserId: number) {
    const post = await PostRepository.findById(id);

    if (!post) {
      throw new NotFoundError("Post não encontrado.");
    }

    if (data.title) post.title = data.title;

    if (data.userId) {
      const user = await UserRepository.findById(data.userId);
      if (!user) {
        throw new NotFoundError("Usuário não encontrado.");
      }
      post.user = user;
    }

    return PostRepository.save(post);
  },
  

  async delete(id: number) {
    const result = await PostRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundError("Post não encontrado.");
    }
  },
};
