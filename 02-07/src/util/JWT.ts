// este arqui sera resposanvel pelo metodos que gerar e tambem verificar um token

import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

interface Payload {
    id: number
    email: string
}

dotenv.config()

const {JWT_SECRET, JWT_EXPIRES_IN} = process.env

// Metodod chamado quando presisan  gerra um token
export function generateToken(Payload: Payload){
    /*
    o metodo sigt() da biblioteca dop JWT gera um token 
    Presisasmos pasasar como argunto:
    1° argumento: as informações do usuarios 
    2° argumento: o 'segredo' que esta em JWT_SECRET  no .env
    3° argumento: o objeto que contem a opção 'expiresin' cujo valor sera variavel JWT_EXPIRES_IN . env
    */
    return jwt.sign(Payload, JWT_SECRET!,{
        expiresIn: Number(JWT_EXPIRES_IN)
    })

}

export function verifyToken(token:string){
    try{
        /*
        Para saber se ele é valido chamamos a função 'verify
        */
       return jwt.verify(token, JWT_SECRET!)
    }catch{
        return null
    }
}