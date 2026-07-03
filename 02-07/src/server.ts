import express from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
import { routes } from "./routes";
import { errorHandler } from "./middlewares/erroHandLer";

const app = express();
dotenv.config;
const PORT = process.env.PORT;

app.use(express.json())
app.use(routes)

AppDataSource.initialize().then(() =>{
    console.log ("Banco de dados conectado com sucesso")

    app.use(errorHandler)
    
    app.listen(PORT, ()=>{
        console.log ("Servidor backend no ar!")
    })
}).catch((error) => console.log('Erro ao conectar com o banco'+ error))