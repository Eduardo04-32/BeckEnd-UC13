


export class User{

    private id?:number;
    private email:string;
    private senha:string;

    constructor( email:string, senha:string, id?:number){
        this.id = id;
        this.email = email;
        this.senha = senha;
    }


    public getId(): number | undefined {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getSenha(): string {
        return this.senha;
    }

    public setSenha(senha: string): void {
        this.senha = senha;
    }

}
