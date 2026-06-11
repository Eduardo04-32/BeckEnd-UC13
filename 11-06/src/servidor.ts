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


//LISTA USUARIO
app.get('/livros', async (req, res) => {
    //tenta fazer a consulta no banco 
    try{
        //  
        const [livros, dados] = await pool.query(
            'SELECT * FROM livros'
        )
        //retorna a resposta com status 200 (ok) e envia a lista de usuario em formato de JSON
        return res.status(200).json(livros)

    }catch (erro){ // se de errado cai aqui e mostra o erro

        console.log("Erro: ", erro)
        return res.status(500).json("Erro0 no servidor: " + erro)
    }
})


//CRIA O NOVO USUARIO
app.post('/livros', async (req, res) => {
    try{
        const {titulo, autor, categoria, ano_de_publicacao} = req.body
        //essa resposta envia no corpo do nossa requisição 
        const [resultado] = await pool.query(
            "INSERT INTO livros (titulo, autor, categoria, ano_de_publicacao) VALUES (?,?,?,?)", [titulo, autor, categoria, ano_de_publicacao]
        )
        return res.status(201).json(resultado)
    }catch (erro){
        return res.status(500).json("Erro interno do servisdor: " + erro)
    }

})

 app.put("/livros/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { titulo, autor, categoria, ano_de_publicacao } = req.body;

    const [resultado] = await pool.query(
      "UPDATE livros SET titulo = ?, autor = ?, categoria = ?, ano_de_publicacao = ? WHERE id = ?",
      [titulo, autor, categoria, ano_de_publicacao, id]
    );

    return res.status(200).json("Livro atualizado com sucesso!");
  } catch (erro) {
    return res.status(500).json("Erro interno do servidor: " + erro);
  }
});

app.delete("/livros/:id", async (req, res) => {
  try {
    const { id } = req.params;

     const [resultado] = await pool.query(
      "DELETE FROM livros WHERE id = ?",
        [id]
    );

    return res.status(200).json("O livro foi usado como lenha");
  } catch (erro) {
    return res.status(500).json("Erro interno do servidor: " + erro);
  }
});

//listem() é o metodo de express para colocar nosso servidor no ar.Ele precissa que passemos coisas como parametro :
// O primero é a porta
// A segunda é uma função  que vai ser executada quando o executor estiver no ar
app.listen(PORT,() => {
    console.log("O servidor esta rodando....")
})


//http://localhost:3000/mensagem

