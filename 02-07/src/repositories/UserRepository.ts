import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";


const repo = AppDataSource.getRepository(User)

export const UserRepository = {
    async findAll(){
        return repo.find({relations:['posts']})
    },

    async findById(id:number){
        return repo.findOne({where:{id}, relations:['posts']})
    },

    async create(data:User){
        const user = repo.create(data)
        return repo.save(user)
    },

}