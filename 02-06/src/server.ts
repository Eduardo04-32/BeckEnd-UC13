import express from 'express'

/*
    Criando o objeto express
    Atravéz dele vamos ter acesso a metodos que nos permitem
    Criar o nosso servidor 
*/
const app = express()
const PORTA = 3000;

/*
Aqui abaixo informamos nosso servidor vai receber e eviar dados em JSON  
*/
app.use(express.json())

/*
aqui vamos criar nossa rota. Resta são funções que criamos que,quando algem a cham faz a requisiçao 
*/
// get significa 'pegar'
//ou seja, esta é uma rota para PEGAR uma INFORMAÇÃO 
//  rotas prsisan de pelomenos 

app.get("/servidor", (req, res) => {
    // res.status(200) significa que o servidor vai enviar um codigo de sucesso (o numero 200)
    //res.status(200).send("mensagem ") é que envia a respostas 
    res.status(200).send("servidor rodando!")
})

//É o que inicia o servidor, põe ele para rodar 

/*
    A função listen() presisan de 2 parametros:
    - o primero é a porta
    -on segundo é a função que vai ser chamada o serviso rodar. 
*/

app.listen(PORTA, () => {
    console.log("Servidor no ar! HUHUUUUUUUUU")
})

