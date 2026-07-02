import { UserRepositories } from "../repositories/USerRepositeries";

export class UserServer{
    
    private reto = new UserRepositories()

    async getAllUsers(){
        try{
            const users = await this.reto.findAll()
            return users 
        }catch (error){
            throw new Error('Erro ao buscar dados')
        }
    }

    async registerUser(nome: string, email: string, senha: string){
        try{
            const user = await this.reto.create(nome, email, senha)
            return user
        } catch {
            throw new Error('Erro ao registrar usuario')
        }
    }
}