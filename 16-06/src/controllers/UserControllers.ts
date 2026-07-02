import { Request, Response } from "express";
import { UsuarioService } from "../services/UserServer";


//Respnsabilidades 
//criamois os metodos quye cvaoa ser chamados nas rotas
//é aqui tyambem que enviamos os status e as respostas do servidor
//ele  chama os metodos que crian o serviço
//é ele que recebe as requisiçoes 
// é ele que envian as respostas

export class UsuarioController {

    private service = new UsuarioService();

    async createUsuario(
        req: Request,
        res: Response
    ) {

        try {

            const { email, senha } = req.body;

            if (!email || !senha) {
                //requisição mal formada, status 400
                return res.status(400).json({
                    mensagem: "Email e senha são obrigatórios"
                });
            }

            await this.service.create(
                email,
                senha
            );

            return res.status(201).json({
                //criado com sucessos, staus 201
                mensagem: "Usuário criado com sucesso"
            });

        } catch {

            return res.status(500).json({
                // erro interno do servidor, staus 500
                mensagem: "Erro interno"
            });

        }
    }

    async listUsuarios(
        req: Request,
        res: Response
    ) {

        try {

            const usuarios =
                await this.service.findAll();
            // ok. status 200
            return res.status(200).json(
                usuarios
            );

        } catch {

            return res.status(500).json({
                mensagem: "Erro interno"
            });

        }
    }

    async getUsuario(
        req: Request,
        res: Response
    ) {

        try {

            const id = Number(
                req.params.id
            );

            const usuario =
                await this.service.findById(id);

            if (!usuario) {
                // não encontrado, status 404
                return res.status(404).json({
                    mensagem: "Usuário não encontrado"
                });
            }

            return res.status(200).json(
                usuario
            );

        } catch {

            return res.status(500).json({
                mensagem: "Erro interno"
            });

        }
    }

    async updateUsuario(
        req: Request,
        res: Response
    ) {

        try {

            const id = Number(
                req.params.id
            );

            const { email, senha } = req.body;

            await this.service.update(
                id,
                email,
                senha
            );

            return res.status(200).json({
                // 
                mensagem: "Usuário atualizado com sucesso"
            });

        } catch {

            return res.status(500).json({
                mensagem: "Erro interno"
            });

        }
    }

    async deleteUsuario(
        req: Request,
        res: Response
    ) {

        try {

            const id = Number(req.params.id);

            if (!id) {
                return res.status(400).json({
                    mensagem: "Informação inexistentes"
                });
            }

            const resultado = await this.service.delete(id);

            if (!resultado) {
                return res.status(404).json({
                    mensagem: "Usuario não encontrado"
                });
            }


            // ok sem restorno, status 204
            return res.status(204).send();

        } catch {

            return res.status(500).json({
                mensagem: "Erro interno"
            });

        }
    }
}