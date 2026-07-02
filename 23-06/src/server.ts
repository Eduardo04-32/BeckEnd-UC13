import express from 'express'

const app = express()
app.use(express.json()) // define a API utiliza JSON 

const PORT = 3000

app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`)
})