import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/cenexão";
import { User } from "../models/User";

interface UserRow extends RowDataPacket {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

export class UserRepository {
  async findAll(): Promise<User[] | null> {
    const [rows] = await pool.query<UserRow[]>("SELECT * FROM users");

    if (rows.length === 0) return null;

    return rows.map(
      (user) => new User(user.id, user.nome, user.email, user.senha),
    );
  }

  async findById(id: number): Promise<User | null> {
    const [result] = await pool.query<UserRow[]>(
      "SELECT * FROM users WHERE id = ?",
      [id],
    );

    if (result[0].length === 0) return null;

    return new User(
      result[0].id,
      result[0].nome,
      result[0].email,
      result[0].senha,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const [result] = await pool.query<UserRow[]>(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );

    if (result[0].length === 0) return null;

    return new User(
      result[0].id,
      result[0].nome,
      result[0].email,
      result[0].senha,
    );
  }

  async create(user: User): Promise<User | null> {
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)",
      [user.getNome(), user.getEmail(), user.getSenha()],
    );

    if (result.affectedRows === 0) return null;

    return new User(
      result.insertId,
      user.getNome(),
      user.getEmail(),
      user.getSenha(),
    );
  }

  async update(user: User): Promise<User | null> {
    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE users SET nome = ?, email = ?, senha = ? WHERE id = ?",
      [user.getNome(), user.getEmail(), user.getSenha(), user.getId()],
    );

    if (result.affectedRows === 0) return null;

    return new User(
      user.getId(),
      user.getNome(),
      user.getEmail(),
      user.getSenha(),
    );
  }

  async delete(id: number): Promise<Boolean> {
    const [result] = await pool.query<ResultSetHeader>(
      "DELETE FROM users WHERE id = ?",
      [id],
    );
    return result ? true : false;
  }
}
