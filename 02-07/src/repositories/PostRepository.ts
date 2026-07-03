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
    }

    create(data: Partial<Post>){
        return Repository.create(data)
    }


}