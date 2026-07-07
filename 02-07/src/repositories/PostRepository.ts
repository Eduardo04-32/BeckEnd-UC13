import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Post } from "../models/Post";

const repo = AppDataSource.getRepository(Post)

export const PostRepository = {
    async findAll(){
        return repo.find({relations: ["user"]})
    },

    async findById(id: number){
        return repo.findOne({where: {id}, relations: ["user"] })
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