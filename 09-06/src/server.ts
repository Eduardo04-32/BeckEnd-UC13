import express from 'express'
import {pool} from './database'

/*
    A varialvel app recebe a istancia do express .  Ou seja, dentro dela agora temos um objeto que, quando chamarmas
    nos da acesso diferentes que vamos preciasar para criar nosso servidor backend.
*/

const app = express()

/*
    indentifica em que posta nosso servidor escurtar a requisição
*/
const PORT = 3000;

//estamos dissendo que nosso servidor via utilizar e comnicar, nas requisiçoes e resposta, usandi json 
app.use(express.json())

// Roatas são metodos especiais que são chamadas para facer uma determoinadfa requisição. cada uma tem com metodo HTTP (GET POST PUT DELETE). O metodo, no express, e feito desta form:
//o primero argumento é o primero caminho para cassar uma rota, ja no segundo é a função executrar quando hamamos a rotas
//app.metodoHTTP('caminho' ,() => {})

//Métodos GET -> buscar uma informação
// rep é o objeto da requisição 
//res é o objeto da resposta
app.get ('/mensagem',(req , res) => {
    res.status(200).send("Ola galera")
})

app.get ('/meunome',(req , res) => {
    res.status(200).send("Meu nome é Jonh japezuelano")
})


//LISTA USUARIO
app.get('/usuario', async (req, res) => {
    //tenta fazer a consulta no banco 
    try{
        //  
        const [usuarios, dados] = await pool.query(
            'SELECT * FROM usuarios'
        )
        //retorna a resposta com status 200 (ok) e envia a lista de usuario em formato de JSON
        return res.status(200).json(usuarios)

    }catch (erro){ // se de errado cai aqui e mostra o erro

        console.log("Erro: ", erro)
        return res.status(500).json("Erro0 no servidor: " + erro)
    }
})


//CRIA O NOVO USUARIO
app.post('/usuarios', async (req, res) => {
    try{
        const {nome, email, senha} = req.body
        //essa resposta envia no corpo do nossa requisição 
        const [resultado] = await pool.query(
            "INSERT INTO usuarios (nome, email, senha) VALUES (?,?,?)", [nome, email, senha]
        )
        return res.status(201).json(resultado)
    }catch (erro){
        return res.status(500).json("Erro interno do servisdor: " + erro)
    }

})

//listem() é o metodo de express para colocar nosso servidor no ar.Ele precissa que passemos coisas como parametro :
// O primero é a porta
// A segunda é uma função  que vai ser executada quando o executor estiver no ar
app.listen(PORT,() => {
    console.log("O servidor esta rodando....")
})


//http://localhost:3000/mensagem

