import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Post } from "../models/Post";

const repo = AppDataSource.getRepository(Post)

export const PostRepository = {
    // encontra todos os post para todos
    async findAll(){
        return repo.find({relations: ["user"]})
    },

    //encontra um post atraves de um id
    async findById(id: number){
        return repo.findOne({where: {id}, relations: ["user"] })
    },

    // este metodo encontra todos os post de um usuario especifo
    async findByUserId(userId:number){
        return  repo.find({where: {user: {id:userId}}, relations: ["user"]})
    },

    create(data: {}){
        return repo.create(data)
    },

    async save(post: Post) {
        return repo.save(post);
    },

    async delete(id: number) {
        return repo.delete(id);
    },


}