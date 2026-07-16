import { listenerCount } from "node:cluster";
import { PostRepository } from "../repositories/PostRepository";
import { UserRepository } from "../repositories/UserRepository";
import { LoggerFactory } from "typeorm/logger/LoggerFactory.js";


export class NotFoundError extends Error {}
export class ForbiddenError extends Error {}


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
      throw new Error("Titulo é obrigatorio.");
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
    return await PostRepository.findByUserId(userId)
  },

  async update(id: number, data: { title?: string}, looggedUser: number) {
    const post = await PostRepository.findById(id);

    if (!post) {
      throw new NotFoundError("Post não encontrado.");
    }

    if (data.title) post.title = data.title;

    // so o dono do postes pode edutare o post 
    if (post.user.id !== looggedUser){
       throw new ForbiddenError("Você não tem permissão para editar este post")
    }

    if(data.title) post.title = data.title;


    return PostRepository.create(post);
  },
  

  async delete(id: number, looggedUserId: number) {
    const result = await PostRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundError("Post não encontrado.");
    }

    if (result){
       throw new ForbiddenError("Você não tem permissão para eliminar este post")
    }

    return 


  },
};
