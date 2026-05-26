const nome = document.getElementById("nome")
const cep = document.getElementById("cep")
const rua = document.getElementById("rua")
const local = document.getElementById("local")
const bairro = document.getElementById("bairro")
const btn = document.getElementById("vtn")

btn.addEventListener("click", async () => {
    try {
        //tentar pegar os dados da api
        const resposta = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
        
        const data = await resposta.json()

        rua.value = data.logradouro;
        bairro.value = data.bairro;
        local.value = data.localidade;

    } catch (erro) { // se de ruim de diz pq n deu bom 
        console.log("Deu ruim porquer " + erro)
    };
})

