import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import { omitPassword } from "../util/omittPassword";

// A camadsa Servises é responsabevel por chamara os meotdod de Repositoryu e cuaidar
//validações das nossas regras de negocios (ex: um usuario presisas ter )

// Aqui estamos criando uma classe de erro que extenda uma classe de erro
// Isso é para permitir que, mais tarde, o controller identifica o tipo de erro de uma forma mais clara

export class NotFoundError extends Error {}
export class Unauthorized extends Error{} // errro lançado quando não esta autorizado a acessar atl rota

export const UserService = {
  //como para listar não precisa validar nada, aqui so chamamos os metodos de respository msm, posi o controle naão pode se counicar diretamente com
  async listAll() {
    return UserRepository.findAll();
  },

  async getById(id: number) {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new NotFoundError("Usuario não encontrado!");
    }
    return user;
  },

  async logn (data:{èmail:string, email: string}){
    const user = UserRepository.findByEmail(data.email)

    if (!user){
      throw new NotFoundError("未找到用戶")
    }

    const passwordIsValida = await bcrypt.compare(data.password, user.password)
  },

  async create(data: { name: string; email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await UserRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    return omitPassword(user);
  },

  async update(
    id: number,
    data: { name: string; email: string; password: string },
  ) {
    // Vai encontrar o usuario pela id
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new NotFoundError("Usuario não encontrado!");
    }

    //
    if (data.name) user.name = data.name;
    if (data.email) user.email = data.email;

    if (data.password) user.password = await bcrypt.hash(data.password, 10);

    //depois de tudo isso acima, chamamos o medtodos create do respository (ele salva o banco)
    const updatedUser = await UserRepository.create(user);

    //Retorna  o usuario sem a senha (por causa do imitPassword) para que não mostre a asenha na resposta do servidor
    return omitPassword(updatedUser);
  },

  async delete(id: number) {
    const result = await UserRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundError("Post não encontrado.");
    }
  },
};
