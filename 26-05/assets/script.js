const btn = document.getElementById("gerar-piada")
const p = document.getElementById("piada")

btn.addEventListener("click", async () => {
    try{
        //tentar pegar os dados da api
        const resposta = await fetch("https:/api.chucknorris.io/jokes/random")

        const data = await resposta.json() 

        p.textContent = data.value 


    } catch(erro) { // se de ruim de diz pq n deu bom 
        console.log("Deu ruim porquer " + erro)
    };
})

