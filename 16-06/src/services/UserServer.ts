import { db } from "../config/databese";
import { User } from "../models/User";

export class UsuarioService {

    async create(email: string, senha: string) {

        const usuario = new User(
            email,
            senha
        );

        const [result] = await db.query(
            "INSERT INTO usuarios (email, senha) VALUES (?, ?)",
            [
                usuario.getEmail(),
                usuario.getSenha()
            ]
        );

        return result;
    }

    async findAll() {

        const [rows] = await db.query(
            "SELECT * FROM usuarios"
        );

        return rows;
    }

    async findById(id: number) {

        const [rows]: any = await db.query(
            "SELECT * FROM usuarios WHERE id = ?",
            [id]
        );

        return rows[0];
    }

    async update(
        id: number,
        email: string,
        senha: string
    ) {

        const [result] = await db.query(
            `UPDATE usuarios
             SET email = ?, senha = ?
             WHERE id = ?`,
            [
                email,
                senha,
                id
            ]
        );

        return result;
    }

    async delete(id: number) {

        const [result] = await db.query(
            "DELETE FROM usuarios WHERE id = ?",
            [id]
        );

        return result;
    }
}