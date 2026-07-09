import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar", length: 100, nullable: false })
  title: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}

/*

criar um novo projeto 
istalar a as dependencias 
configurar o tsConfig, etc 

Crie as entidades User e Task 

user deve ter
-id 
-name 
-email
-password

task deve ter 
-id 
-title
-descrition

faça as relações
o objetivos e craiar um beackned de um gerardor de tarefas, onde um usuario pode criar varias tarefas 

*/