import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";

//sinalizar ao typeorm que essa classe vai ser mapeada em uma tabela, utilizamos um decorator pra isto

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ length: 100, unique: true, nullable:false })
  email: string;

  @Column({ nullable:false,})
  password: string;
  
  @OneToMany(()=>Post,post => post.user)
  posts:Post[]
  
}