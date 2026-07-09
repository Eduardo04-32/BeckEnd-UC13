# O que é o jwt, o que significa? Onde ele mora? Do que ele se alimenta

JWT sigmifica Json Web Token, Ele é o codigo que salva no navegador que, entre outras coisas, guardas as informações do usuarios (exemplo: `{id: 1, email: "sig Moreno}`)

Como ele se parece? ele se parece com isso aqui

` eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhbGljZUBtYWlsLmNvbSJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

Para que ele serve? Ele serve para guardadr informações de qual usuario esta logado. Assim nos podemos fazer requisições (exeplo, criar um post) sem pedir para logue novamente toda vez . tambnem podem pedir que um usuario crie, atualize, delete post apena para si msm, apena suas informações e não a dos outros

Por exeplos: Vamos pensta em uma rede social. imagina que tu assece ao intagram e cria um post, vc presisa primeiro ter conta e logar. Nos usamos jwt justamnente para fazer isso: logar otra coisa, vc so pode criar post para si msm, não ha como criar ou deletar, por exeplo o post dos outros usuarios. O JWT tambem garante isso, pois ele informa qual o id do usuario que esta logado

O token ele é dividido em 3 parates, as mais importante são as duas ultimas: o Payload e o Signature

O Payload é a parte do meio. é ali que fica armecenadado as informações com id e o email do usuario

O Signature é a terceira parte: Ali fica armazenado o "segredo" que um codigo que cadsa sistema tem o seu. Ele garante a que aquele token pertence aquele sistema, se for modificado, por exemplo, ele é inavalidado. Isso evita que uma pessoa pegue qualquer token e tente usar nosso sistema

Como usar no nosso projeto??

- 1 Primero é presiso istalar as dependencias

```bash
npm install jsonwebtoken @types/jsonwebtoken
```

- 2 Para usarmos o JWT agoara vamos crair u, arquivo `jwt.ts` dentro da pasta `Utils`.

Dentro deste arquivo, presisamnos então:

- 2.1 Importa tudo que for necessario: O jwt é tambem o dotenv (pois teremos varaiaveis impostante la)

```ts
import jwt from 'jsonwebtoken'
import * as dotenv 'dotenv'
```

- 2.2 Presisamos carregar as variaveis do .env para o objeto process.env (ele é quem nos forneces os valores depois)

```ts
dotenv.config(); // sem isso aqui não acessa as variavei do .env

// pegamos as variaveis do .env
// use sempre o mesmo nome e a mesma ordem que esta no .env

const { DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME } = process.env;
```

- 2.3 No .env, presisamos ter as variaveis correspondentes

```ts
DB_HOST = localhost;
DB_PORT = 3306;
DB_USER = root;
DB_PWD = root;
DB_NAME = rede_social;

PORT = 3000;
// esta são as novas variaveuis do ambiente
JWT_SECRET = minhaChaveSecreta123; // serve para converter depois da assinatura do token
JWT_EXPIRES_IN = 86400; // indica por tempo do teken (um dia inteiro)
```

- 2.4 Voltado ao arquivo `jwt.ts` vamos criar uma interfase chamada Payload para representar o que nos esperamos do nosso token

```ts
interface Payload {
  id: number;
  email: string;
}
```

- 2.5 Agora vamos criar uma função que gera um novo tokem. Geralmente chamamos o metodo de uma função login, ect.

```ts
// Nunca se esqueçan de 'export' ou não podemos usar esta função em outro arquivo
// Nosso metodo recebe por parametros de um objeto que deve ter id e email(por causa do nosso interface)
export function generateToken(payload: Payload) {
  // O metodo sign() da biblioteca do jwt serve para criar o novo token
  // para isso passamos para ele nasta orden
  // 1 - o Payload com as informações do usuario
  // 2 - o segredo que esta no JWT_SECRET
  // 3 - um objeto (ou seja entre 'chaves':{}) que contem a opições 'expiresIn', como o valor de JWT_EXPIRES_IN=86400 no sig()
 //Se no .env estiver algo como "JWT_EXPIRES_IN = 86400", no sign() você precisa chamá-lo dentro de Number() para convertê-lo de string para número.

export function generateToken(payload: Payload) {
  return jwt.sign(payload, JWT_SECRET!, {
    expiresIn: Number(JWT_EXPIRES_IN),
  });
}

// O argumento JWT_SECRET possui um "!" no final porque o TypeScript considera
// que essa variável pode ser undefined. Ao colocar o ponto de exclamação,
// é como se disséssemos: "tem sim, confia no pai".

```

- 2.6 Criamos a função que gera o token. agora vamos criar a função que ele analisa se ele é valido ou não

```ts
// O token vem no formato do string mesmo
export function verifyToken(token: strting) {
  // chamamos a função verify() da biblioteca do jwt para fazer a verificação
  // O primeiro argumento é o proprio token
  // o segundo é o JWT_SECRET
  // se for valido, a função retorna as infos do usuario
  return jwt.verify(token, JWT_SCRETE!);
}catch{
    // se não for retorna nulo
    return null
}

```

Extra: se quiser testar, no mesmo arquivo voce pode chamar os metodos, primeiro o generate e depois o verify():

```ts
//gere um token com as informações que quiser
const token = genereteToken({ id: 1, email: "sla@senac" });
// mostra o token no terminal
console.log(token);

// Depois confira se o token é valido (se for o token que acavamos de gerar, sempre vaiu ser valido)
const tokenValido = verifyToken(token);
console.log(tokenValido); // se mostra as infos do usuarios ele é valido, se mostra null não é
```

Depois, rode com o comando

```bash
npx ts-node-dev src/utils/JWT.ts
```

Passo 3 - se não tiver a função de crair por email no UserRepository, presisamos criala. Se ja tem podemos pular esta etapa, Va ate repositori e cria a segunate função

```ts
  async findByEmail(email:string){
    //finOne() é uma função do TypeORM que retorna um unicio resultado (se usamos apenas find() ele restorna apenas uma Array)
    return repo.findOne({where: {email}})
  },
```

Passo 4 - Na camada service, vamos presisar adicionar mais algumas coisas

- 4.1 Adicionara uma extensao de uma clase `Erro` que vamos dar nome de `UnauthorizedErro` (UnauthorizedErro = não autoriza) adiciona a segunte linha em `UserServece.ts`:
  // TA FALTANDO COISASSSSSSSSSSSS

```ts
export class UnauthorizeErro extends Erro {}
```

- 4.2 Vamos adicionar os metodos do log dentro do `UserService.ts`

```ts
// recev=be o email e senha como parametro
  async login(data:{email:string, password: string}){
    // Verifivca se o emial existe
    // Presisamos do await ja que o metodo é async (ele presisa de um tempo para buscar as informações no banco)
      const user = UserRepository.findByEmail(data.email)

    // TA FATALTONDO COISASSSSSSSSSSSSSSSSS


    // Verifimos se a senha esta correta
    // data.password pega a senha e envia como parametro

      const IsValid = await bcrypt.compare(data.password, user.password)

      //fazemos uma veificaçao caso o email não estaja certo
      if (!user || !password) throw new NotFoundError("Informações Incorreto")

      const token = jwt.generateToken({
        user.id
        user.email
      })

      console.log(token)

      return{
        user: omitPassword(user), // chamamos este metodo que craiamos anteriormente, a sneha do usuario não aparece na resposta do servidor (IMPORTANTE DE MAIS)
        token
      }
    }
```

Passo 5 - Agora, depois de servece vamos para a camada `r` onde vamos craiara um araquivo `se` ele ficara resposanvvel pela çarte de loginho. Dentro dele, insira: 

-5.1 os import 

```ts
import { NextFunction, Request, Response } from "express";
import {UserService} from "../services/UserServices.ts"
```
- 5.2 Os metodos do loginho 

```ts
export class AuthController{
  async login (req:Request, res: Response, next: NextFunction){
    try{
      // Presisamos extrair o emaile e a senha polo metodo requisição
      const {email, password} = req.body // Lembrem sempre de ordem e com o msm nome

      // chamamos o metodos de login  da camada serveces: 
      const result = await UserServices.login({email, password})

      return res.status(200).json(result)

    } catch(error){
        next(error)
    }
  }
}
```
Passo 6 - Agora presisasmos criara a rota do Auth. Porem, ao contrario que fazemos antes, não vamso por as rotas em um unico arquivo, Vamos dividirlas entre: routas de Auth, rotas de user, rotas de post e ai um arquivo principal que reune totas elas, vamos la: 

### 6.1 - Dentro da pasta `routes`, crie um arquivo chamado `auth.routes.ts`.

Dentro dele, faça os imports:

```ts
import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
```

### 6.2 - Crie o objeto `router` e uma instância do `AuthController`.

```ts
const router = Router();
const authController = new AuthController();
```

### 6.3 - Agora, vamos criar a rota de login.

Essa rota receberá uma requisição do tipo **POST** para `/login`. Quando ela for chamada, executará o método `login()` do `AuthController`.

```ts
router.post("/login", authController.login.bind(authController));
```

### 6.4 - Por fim, exporte o `router` para que ele possa ser utilizado em outros arquivos.

```ts
export default router;
```

O arquivo `auth.routes.ts` ficará assim:

```ts
import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();
const authController = new AuthController();

router.post("/login", authController.login);

export default router;
```